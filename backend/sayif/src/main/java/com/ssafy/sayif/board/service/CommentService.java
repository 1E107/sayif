package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.converter.CommentConverter;
import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.dto.CommentResponseDto;
import com.ssafy.sayif.board.entity.Comment;
import com.ssafy.sayif.board.exception.CommentNotFoundException;
import com.ssafy.sayif.board.repository.CommentRepository;
import com.ssafy.sayif.member.exception.UnauthorizedAccessException;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
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

    private Comment findCommentById(int commentId) {
        return commentRepository.findById(commentId)
            .orElseThrow(() -> new CommentNotFoundException(commentId));
    }

    private boolean isAuthorizedUser(Comment comment, String memberId) {
        return !memberId.equals(comment.getMember().getMemberId());
    }

    private Comment updateCommentContent(Comment comment, String content) {
        Comment updatedComment =
            comment.toBuilder()
                .content(content)
                .modifiedAt(LocalDateTime.now()).build();
        commentRepository.save(updatedComment);
        return updatedComment;
    }

    private CommentResponseDto convertToDto(Comment comment) {
        return CommentResponseDto.builder()
            .id(comment.getId())
            .content(comment.getContent())
            .createdAt(comment.getCreatedAt())
            .writer(comment.getMember().getMemberId())
            .build();
    }

    public void writeComment(CommentRequestDto dto) {
        Comment comment = commentConverter.convertToEntity(dto);
        commentRepository.save(comment);
    }

    public Comment modifyComment(int commentId, String memberId, CommentRequestDto dto) {
        Comment comment = findCommentById(commentId);

        if (isAuthorizedUser(comment, memberId)) {
            throw new UnauthorizedAccessException("Invalid member ID");
        }

        return updateCommentContent(comment, dto.getContent());
    }

    public void deleteComment(int commentId, String memberId) {
        Comment comment = findCommentById(commentId);

        if (isAuthorizedUser(comment, memberId)) {
            throw new UnauthorizedAccessException("Invalid member ID");
        }

        commentRepository.delete(comment);
    }

    public List<CommentResponseDto> getCommentList(int boardId) {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
            .filter(comment -> comment.getBoard().getId() == boardId)
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

}
