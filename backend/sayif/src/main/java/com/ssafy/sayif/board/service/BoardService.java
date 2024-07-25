package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
     * @param dto
     * @return Optional<Board>
     */
    public Optional<Board> writePost(WritePostRequestDto dto) {
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
            .member(member)
            .build();

        Board savedBoard = boardRepository.save(board);
        return Optional.of(savedBoard);
    }

    /**
     * 게시글 수정
     *
     * @param id
     * @param dto
     * @return Optional<Board>
     */
    public Optional<Board> modifyPost(int id, ModifyPostRequestDto dto) {
        Board existBoard = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID: " + id));
        Board updatedBoard = Board.builder()
            .id(id)
            .member(existBoard.getMember())
            .createdAt(existBoard.getCreatedAt())
            .hitCount(existBoard.getHitCount())
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .build();

        return Optional.of(boardRepository.save(updatedBoard));
    }

}
