package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.dto.BoardResponseDto;
import com.ssafy.sayif.board.dto.PostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.BoardType;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.common.service.S3Service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.exception.MemberNotFoundException;
import com.ssafy.sayif.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * 게시판 서비스를 제공하는 클래스입니다. 게시글의 CRUD 작업 및 목록 조회와 관련된 비즈니스 로직을 처리합니다.
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final GoodService goodService;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket-names.board}")
    private String bucketName; // S3 버킷 이름

    /**
     * 새로운 게시글을 작성합니다.
     *
     * @param dto      게시글 작성 요청을 담고 있는 DTO
     * @param username 로그인한 사용자의 username
     * @return 작성된 게시글의 DTO를 감싼 Optional 객체
     * @throws MemberNotFoundException 해당 ID의 멤버가 존재하지 않을 경우 예외를 던집니다.
     */
    public Optional<BoardResponseDto> writePost(PostRequestDto dto, MultipartFile file,
        String username) {
        // 파일이 존재하는 경우에만 파일 저장 및 파일 이름 설정
        String fileUrl = "";
        if (file != null && !file.isEmpty()) {
            fileUrl = s3Service.upload(file, bucketName);
        }

        // 작성 요청 DTO에서 멤버를 조회
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException(username);
        }

        // 새로운 게시글 엔티티 생성
        Board board = Board.builder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .file(fileUrl)
            .isRemove(false)
            .member(member)
            .build();

        // 게시글 저장 및 DTO로 변환하여 반환
        Board savedBoard = boardRepository.save(board);
        return Optional.of(convertToDto(savedBoard));
    }

    /**
     * 기존 게시글을 수정합니다.
     *
     * @param id   수정할 게시글의 ID
     * @param dto  게시글 수정 요청을 담고 있는 DTO
     * @param file 업로드할 파일
     * @return 수정된 게시글의 DTO를 감싼 Optional 객체
     * @throws IllegalArgumentException 해당 ID의 게시글이 존재하지 않을 경우 예외를 던집니다.
     */
    public Optional<BoardResponseDto> modifyPost(int id, PostRequestDto dto, MultipartFile file) {
        // 수정할 게시글 조회
        Board existBoard = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));

        // 기존 파일 URL 저장
        String oldFileUrl = existBoard.getFile();

        // 새로운 파일이 존재하는 경우에만 파일 저장 및 파일 이름 설정
        String newFileUrl = "";
        if (file != null && !file.isEmpty()) {
            // 새로운 파일을 S3에 업로드하고, 해당 파일의 URL을 저장
            newFileUrl = s3Service.upload(file, bucketName);
        }

        // 게시글 수정
        Board updatedBoard = existBoard.toBuilder()
            .file(Objects.equals(newFileUrl, "") ? oldFileUrl
                : newFileUrl) // 새로운 파일 URL이 존재하지 않으면 DTO에서 가져온 파일 URL 사용
            .title(dto.getTitle()) // 새로운 제목 설정
            .content(dto.getContent()) // 새로운 내용 설정
            .modifiedAt(LocalDateTime.now()) // 수정 시간 업데이트
            .type(dto.getType()) // 새로운 타입 설정
            .build();

        // 수정된 게시글 저장
        Board savedBoard = boardRepository.save(updatedBoard);

        // 새로운 파일이 업로드되었고, 기존 파일이 존재하는 경우 S3에서 기존 파일 삭제
        if (!Objects.equals(newFileUrl, "") && oldFileUrl != null && !oldFileUrl.isEmpty()) {
            // S3에서 기존 파일 삭제
            s3Service.deleteFileFromS3(oldFileUrl, bucketName);
        }

        // 수정된 게시글을 DTO로 변환하여 반환
        return Optional.of(convertToDto(savedBoard));
    }


    /**
     * 게시글을 논리적으로 삭제합니다.
     *
     * @param id 삭제할 게시글의 ID
     * @return 삭제가 성공적으로 이루어졌으면 true, 이미 삭제된 게시글인 경우 false를 반환합니다.
     * @throws IllegalArgumentException 해당 ID의 게시글이 존재하지 않을 경우 예외를 던집니다.
     */
    public boolean removePost(int id) {
        // 삭제할 게시글 조회
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));

        // 게시글이 이미 삭제된 상태인지 확인
        if (board.getIsRemove()) {
            return false;
        }

        // 게시글 삭제 처리
        Board updatedBoard = board.toBuilder()
            .isRemove(true)
            .removeAt(LocalDateTime.now())
            .build();

        // 삭제된 게시글 저장
        boardRepository.save(updatedBoard);
        return true;
    }

    /**
     * 게시글 목록을 조회합니다.
     *
     * @param type 게시글의 타입 (예: 자유게시판, 공지사항 등)
     * @param page 페이지 번호 (0부터 시작)
     * @param size 페이지 크기 (한 페이지에 표시할 게시글 수)
     * @return 게시글 목록과 페이지네이션 정보가 포함된 Page 객체
     */
    public Page<BoardResponseDto> getPostList(BoardType type, int page, int size) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardPage;

        if (type == BoardType.Total) {
            boardPage = boardRepository.findAllByOrderByCreatedAtDesc(pageable);
        } else {
            boardPage = boardRepository.findAllByTypeOrderByCreatedAtDesc(pageable, type);
        }

        // 페이지네이션 정보를 포함한 게시글 목록 반환
        return boardPage.map(this::convertToDto);
    }

    /**
     * 게시글의 상세 정보를 조회합니다.
     *
     * @param id 조회할 게시글의 ID
     * @return 게시글의 DTO
     * @throws IllegalArgumentException 해당 ID의 게시글이 존재하지 않을 경우 예외를 던집니다.
     */
    public BoardResponseDto getPostDetail(int id) {
        // 게시글 조회
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));
        board.addHitCount();
        return this.convertToDto(board);
    }

    /**
     * Board 엔티티를 BoardResponseDto로 변환합니다.
     *
     * @param board 변환할 Board 엔티티
     * @return 변환된 BoardResponseDto
     */
    private BoardResponseDto convertToDto(Board board) {
        String writer =
            board.getType() == BoardType.Worry ? "***" : board.getMember().getNickname();
        return BoardResponseDto.builder()
            .id(board.getId())
            .title(board.getTitle())
            .content(board.getContent())
            .fileUrl(board.getFile())
            .writer(writer)
            .type(board.getType())
            .hitCount(board.getHitCount())
            .createdAt(board.getCreatedAt())
            .modifiedAt(board.getModifiedAt())
            .isRemove(board.getIsRemove())
            .goodCount(goodService.getGoodCountByBoardId(board.getId()))
            .build();

    }
}
