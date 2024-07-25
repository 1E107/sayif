package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.dto.BoardResponseDto;
import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.member.entity.Member;
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

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    /**
     * �Խñ� �ۼ�
     *
     * @param dto �Խñ� �ۼ� ��û DTO
     * @return �ۼ��� �Խñ��� BoardResponseDto�� Optional�� ��ȯ
     */
    public Optional<BoardResponseDto> writePost(WritePostRequestDto dto) {
        for (Member member : memberRepository.findAll()) {
            log.info(member.toString());
        }
        Member member = memberRepository.findById(dto.getMemberId())
            .orElseThrow(
                () -> new IllegalArgumentException("Invalid member ID: " + dto.getMemberId()));

        Board board = Board.builder()
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .isRemove(false)
            .member(member)
            .build();

        Board savedBoard = boardRepository.save(board);
        return Optional.of(convertToDto(savedBoard));
    }

    /**
     * �Խñ� ����
     *
     * @param id  ������ �Խñ��� ID
     * @param dto �Խñ� ���� ��û DTO
     * @return ������ �Խñ��� BoardResponseDto�� Optional�� ��ȯ
     */
    public Optional<BoardResponseDto> modifyPost(int id, ModifyPostRequestDto dto) {
        Board existBoard = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));
        Board updatedBoard = Board.builder()
            .id(id)
            .member(existBoard.getMember())
            .createdAt(existBoard.getCreatedAt())
            .modifiedAt(LocalDateTime.now())
            .hitCount(existBoard.getHitCount())
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .isRemove(false)
            .type(dto.getType())
            .build();

        Board savedBoard = boardRepository.save(updatedBoard);
        return Optional.of(convertToDto(savedBoard));
    }

    /**
     * �Խñ� ���� ����
     *
     * @param boardId ������ �Խñ��� ID
     * @return ������ �Խñ��� BoardResponseDto�� Optional�� ��ȯ, �̹� ������ �Խñ��� ��� Optional.empty() ��ȯ
     */
    public boolean removePost(int boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + boardId));

        if (board.getIsRemove()) {
            return false;
        }

        Board updatedBoard = Board.builder()
            .id(board.getId())
            .member(board.getMember())
            .title(board.getTitle())
            .content(board.getContent())
            .hitCount(board.getHitCount())
            .type(board.getType())
            .file(board.getFile())
            .isRemove(true) // isRemove �ʵ带 true�� ����
            .removeAt(LocalDateTime.now()) // removeAt �ʵ带 ���� �ð����� ����
            .createdAt(board.getCreatedAt())
            .modifiedAt(board.getModifiedAt())
            .build();

        boardRepository.save(updatedBoard); // ���� ���� ����
        return true;
    }

    /**
     * �Խñ� ��� ��ȸ
     *
     * @param page ������ ��ȣ
     * @param size ������ ũ��
     * @return �Խñ� ����� BoardResponseDto ����Ʈ
     */
    public List<BoardResponseDto> getPostList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardPage = boardRepository.findAll(pageable);

        return boardPage.stream()
            .filter(board -> !board.getIsRemove()) // isRemove�� false�� �Խñ� ���͸�
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    /**
     * Board ��ƼƼ�� BoardResponseDto�� ��ȯ
     *
     * @param board ��ȯ�� Board ��ƼƼ
     * @return ��ȯ�� BoardResponseDto
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
