package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.converter.CommentConverter;
import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.entity.Comment;
import com.ssafy.sayif.board.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentConverter commentConverter;

    public void writeComment(CommentRequestDto dto) {
        commentRepository.save(commentConverter.convertToEntity(dto));
    }


    public void modifyComment(int commentId, String username, CommentRequestDto dto) {
        Comment comment =
            commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

        if (!username.equals(comment.getMember().getUsername())) {
            throw new IllegalArgumentException("Invalid member ID");
        }

        commentRepository.save(
            Comment.builder()
                .board(comment.getBoard())
                .member(comment.getMember())
                .content(dto.getComment()).build());
    }
}
