package com.ssafy.sayif.board.converter;

import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.Comment;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentConverter {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    private record Result(Board board, Member member) {

    }

    private Result getResult(CommentRequestDto dto) {
        Board board = boardRepository.findById(dto.getBoardId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));
        Member member = memberRepository.findByUsername(dto.getUsername());
        if (member == null) {
            throw new IllegalArgumentException("Invalid member ID");
        }
        return new Result(board, member);
    }


    public Comment convertToEntity(CommentRequestDto dto) {
        Result result = getResult(dto);
        return Comment.builder()
            .member(result.member())
            .board(result.board())
            .content(dto.getContent())
            .build();
    }

}
