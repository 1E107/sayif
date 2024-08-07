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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    /**
     * 새로운 게시글을 작성합니다.
     *
     * @param dto 게시글 작성 요청을 담고 있는 DTO
     * @return 작성된 게시글의 DTO를 감싼 Optional 객체
     * @throws MemberNotFoundException 해당 ID의 멤버가 존재하지 않을 경우 예외를 던집니다.
     */
    public Optional<BoardResponseDto> writePost(PostRequestDto dto) {
        // 모든 멤버 정보를 로그에 출력
        for (Member member : memberRepository.findAll()) {
            log.info(member.toString());
        }

        // 작성 요청 DTO에서 멤버를 조회
        Member member = memberRepository.findByUsername(dto.getUsername());
        if (member == null) {
            throw new MemberNotFoundException(dto.getUsername());
        }

        // 새로운 게시글 엔티티 생성
        Board board = Board.builder()
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
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
     * @param id  수정할 게시글의 ID
     * @param dto 게시글 수정 요청을 담고 있는 DTO
     * @return 수정된 게시글의 DTO를 감싼 Optional 객체
     * @throws IllegalArgumentException 해당 ID의 게시글이 존재하지 않을 경우 예외를 던집니다.
     */
    public Optional<BoardResponseDto> modifyPost(int id, PostRequestDto dto) {
        // 수정할 게시글 조회
        Board existBoard = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));

        // 게시글 수정
        Board updatedBoard = existBoard.toBuilder()
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .modifiedAt(LocalDateTime.now())
            .type(dto.getType())
            .build();

        // 수정된 게시글 저장 및 DTO로 변환하여 반환
        Board savedBoard = boardRepository.save(updatedBoard);
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
     * @return 삭제되지 않은(isRemove = false) 게시글 목록의 DTO 리스트
     */
    public List<BoardResponseDto> getPostList(BoardType type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardPage = boardRepository.findAllByType(pageable, type);

        // 삭제되지 않은 게시글만 필터링하여 DTO로 변환
        return boardPage.getContent().stream()
            .filter(board -> !board.getIsRemove())
            .map(this::convertToDto)
            .collect(Collectors.toList());
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
        return this.convertToDto(board);
    }

    /**
     * Board 엔티티를 BoardResponseDto로 변환합니다.
     *
     * @param board 변환할 Board 엔티티
     * @return 변환된 BoardResponseDto
     */
    private BoardResponseDto convertToDto(Board board) {
        return BoardResponseDto.builder()
            .id(board.getId())
            .title(board.getTitle())
            .content(board.getContent())
            .fileUrl(board.getFile())
            .writer(board.getMember().getName())
            .type(board.getType())
            .hitCount(board.getHitCount())
            .createdAt(board.getCreatedAt())
            .modifiedAt(board.getModifiedAt())
            .isRemove(board.getIsRemove())
            .goodCount(goodService.getGoodCountByBoardId(board.getId()))
            .build();

    }
}
