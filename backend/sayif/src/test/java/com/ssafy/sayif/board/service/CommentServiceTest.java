package com.ssafy.sayif.board.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.sayif.board.converter.CommentConverter;
import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.dto.CommentResponseDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.Comment;
import com.ssafy.sayif.board.repository.CommentRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.exception.UnauthorizedAccessException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentConverter commentConverter;

    @InjectMocks
    private CommentService commentService;

    private Member member;
    private Board board;
    private Comment comment;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        member = new Member();
        member.setMemberId("member1");

        board = Board
            .builder()
            .id(1)
            .build();

        comment = Comment.builder()
            .id(1)
            .content("Test comment")
            .createdAt(LocalDateTime.now())
            .member(member)
            .board(board)
            .build();
    }

    @Test
    public void testWriteComment() {
        CommentRequestDto dto = new CommentRequestDto();
        dto.setContent("New comment");
        dto.setMemberId("member1");
        dto.setBoardId(1);

        when(commentConverter.convertToEntity(dto)).thenReturn(comment);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        commentService.writeComment(dto);

        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    public void testModifyComment() {
        CommentRequestDto dto = new CommentRequestDto();
        dto.setContent("Updated comment");

        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        Comment modifiedComment = commentService.modifyComment(1, "member1", dto);

        verify(commentRepository, times(1)).save(any(Comment.class));
        assertEquals("Updated comment", modifiedComment.getContent());
    }

    @Test
    public void testModifyCommentUnauthorized() {
        CommentRequestDto dto = new CommentRequestDto();
        dto.setContent("Updated comment");

        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        assertThrows(UnauthorizedAccessException.class,
            () -> commentService.modifyComment(1, "member2", dto));

        verify(commentRepository, times(0)).save(any(Comment.class));
    }

    @Test
    public void testDeleteComment() {
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        commentService.deleteComment(1, "member1");

        verify(commentRepository, times(1)).delete(any(Comment.class));
    }

    @Test
    public void testDeleteCommentUnauthorized() {
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        assertThrows(UnauthorizedAccessException.class,
            () -> commentService.deleteComment(1, "member2"));

        verify(commentRepository, times(0)).delete(any(Comment.class));
    }

    @Test
    public void testGetCommentList() {
        Comment comment2 = Comment.builder()
            .id(2)
            .content("Another comment")
            .createdAt(LocalDateTime.now())
            .member(member)
            .board(board)
            .build();

        List<Comment> comments = Arrays.asList(comment, comment2);

        when(commentRepository.findAll()).thenReturn(comments);

        List<CommentResponseDto> result = commentService.getCommentList(1);

        assertEquals(2, result.size());
        assertEquals("Test comment", result.get(0).getContent());
        assertEquals("Another comment", result.get(1).getContent());
    }

}
