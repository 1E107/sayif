package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.dto.BoardResponseDto;
import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.exception.BoardNotFoundException;
import com.ssafy.sayif.board.repository.BoardRepository;
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
 * 게시판 서비스 클래스입니다.
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    /**
     * 게시글 작성
     *
     * @param dto 게시글 작성 요청 DTO
     * @return 작성된 게시글의 BoardResponseDto를 Optional로 반환
     */
    public Optional<BoardResponseDto> writePost(WritePostRequestDto dto) {
        Member member = memberRepository.findById(dto.getMemberId())
            .orElseThrow(() -> new MemberNotFoundException(dto.getMemberId()));

        Board board = Board.builder()
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .isRemove(false)
            .member(member)
            .createdAt(LocalDateTime.now())
            .build();

        Board savedBoard = boardRepository.save(board);
        return Optional.of(convertToDto(savedBoard));
    }

    /**
     * 게시글 수정
     *
     * @param id  수정할 게시글의 ID
     * @param dto 게시글 수정 요청 DTO
     * @return 수정된 게시글의 BoardResponseDto를 Optional로 반환
     */
    public Optional<BoardResponseDto> modifyPost(int id, ModifyPostRequestDto dto) {
        Board existBoard = boardRepository.findById(id)
            .orElseThrow(() -> new BoardNotFoundException(id));

        Board updatedBoard = existBoard.toBuilder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .file(dto.getFile())
            .type(dto.getType())
            .modifiedAt(LocalDateTime.now())
            .build();

        Board savedBoard = boardRepository.save(updatedBoard);
        return Optional.of(convertToDto(savedBoard));
    }

    /**
     * 게시글 논리적 삭제
     *
     * @param id 삭제할 게시글의 ID
     * @return 삭제 여부를 반환
     */
    public boolean removePost(int id) {
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new BoardNotFoundException(id));

        if (board.getIsRemove()) {
            return false;
        }

        Board removedBoard = board.toBuilder()
            .isRemove(true) // isRemove 필드를 true로 설정
            .removeAt(LocalDateTime.now()) // removeAt 필드를 현재 시간으로 설정
            .build();

        boardRepository.save(removedBoard); // 변경 사항 저장
        return true;
    }

    /**
     * 게시글 목록 조회
     *
     * @param page 페이지 번호
     * @param size 페이지 크기
     * @return isRemove가 false인 게시글 목록의 BoardResponseDto 리스트
     */
    public List<BoardResponseDto> getPostList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardPage = boardRepository.findAll(pageable);

        return boardPage.stream()
            .filter(board -> !board.getIsRemove())
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    /**
     * 게시글 상세 조회
     *
     * @param id 조회할 게시글의 ID
     * @return 게시글의 BoardResponseDto
     */
    public BoardResponseDto getPostDetail(int id) {
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new BoardNotFoundException(id));
        return convertToDto(board);
    }

    /**
     * Board 엔티티를 BoardResponseDto로 변환
     *
     * @param board 변환할 Board 엔티티
     * @return 변환된 BoardResponseDto
     */
    private BoardResponseDto convertToDto(Board board) {
        return BoardResponseDto.builder()
            .id(board.getId())
            .title(board.getTitle())
            .content(board.getContent())
            .file(board.getFile())
            .writer(board.getMember().getName())
            .type(board.getType())
            .hitCount(board.getHitCount())
            .createdAt(board.getCreatedAt())
            .modifiedAt(board.getModifiedAt())
            .isRemove(board.getIsRemove())
            .build();
    }
}
