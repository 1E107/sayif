package com.ssafy.sayif.team.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.sayif.board.exception.CommentNotFoundException;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.exception.UnauthorizedAccessException;
import com.ssafy.sayif.team.converter.TeamBoardCommentConverter;
import com.ssafy.sayif.team.dto.TeamBoardCommentRequestDto;
import com.ssafy.sayif.team.dto.TeamBoardCommentResponseDto;
import com.ssafy.sayif.team.entity.QnaAnswer;
import com.ssafy.sayif.team.entity.TeamBoard;
import com.ssafy.sayif.team.repository.TeamBoardCommentRepository;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class TeamBoardCommentServiceTest {

    @InjectMocks
    private TeamBoardCommentService commentService;

    @Mock
    private TeamBoardCommentRepository commentRepository;

    @Mock
    private TeamBoardCommentConverter commentConverter;

    private QnaAnswer comment;
    private Member member;
    private TeamBoard board;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        member = Member.builder().username("testUser").build();

        board = TeamBoard.builder().id(1).build();

        comment = QnaAnswer.builder()
            .id(1)
            .answer("Test comment")
            .createdAt(LocalDateTime.now())
            .modifiedAt(LocalDateTime.now())
            .member(member)
            .teamBoard(board)
            .build();
    }

    @Test
    void testWriteComment() {
        // 댓글 작성 테스트
        // 댓글 작성 요청 DTO를 설정하고 댓글 엔티티를 반환하도록 설정합니다.
        TeamBoardCommentRequestDto requestDto = new TeamBoardCommentRequestDto();
        when(commentConverter.convertToEntity(any())).thenReturn(comment);
        when(commentRepository.save(any())).thenReturn(comment);

        // 댓글 작성 서비스 메서드를 호출합니다.
        commentService.writeComment(requestDto);

        // 댓글 변환기와 저장소 메서드가 한 번씩 호출되었는지 확인합니다.
        verify(commentConverter, times(1)).convertToEntity(requestDto);
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void testModifyCommentSuccess() {
        // 댓글 수정 성공 테스트
        // 댓글 수정 요청 DTO를 설정하고 댓글 조회 메서드가 올바른 댓글 엔티티를 반환하도록 설정합니다.
        TeamBoardCommentRequestDto requestDto = new TeamBoardCommentRequestDto();
        requestDto.setContent("Updated comment");
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        // 댓글 수정 서비스 메서드를 호출합니다.
        TeamBoardCommentResponseDto updatedComment = commentService.modifyComment(1, "testUser",
            requestDto);

        // 댓글 내용이 업데이트되었는지 확인하고 저장소 메서드가 호출되었는지 확인합니다.
        assertEquals("Updated comment", updatedComment.getContent());
        verify(commentRepository, times(1)).save(any(QnaAnswer.class));
    }

    @Test
    void testModifyCommentUnauthorized() {
        // 댓글 수정 시 권한 없는 사용자 예외 테스트
        // 댓글 수정 요청 DTO를 설정하고 댓글 조회 메서드가 올바른 댓글 엔티티를 반환하도록 설정합니다.
        TeamBoardCommentRequestDto requestDto = new TeamBoardCommentRequestDto();
        requestDto.setContent("Updated comment");
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        // 권한이 없는 사용자가 댓글을 수정하려고 할 때 UnauthorizedAccessException이 발생하는지 확인합니다.
        assertThrows(UnauthorizedAccessException.class,
            () -> commentService.modifyComment(1, "wrongUser", requestDto));
    }

    @Test
    void testModifyCommentNotFound() {
        // 댓글 수정 시 댓글을 찾지 못하는 경우 예외 테스트
        // 댓글 조회 메서드가 빈 Optional을 반환하도록 설정합니다.
        TeamBoardCommentRequestDto requestDto = new TeamBoardCommentRequestDto();
        when(commentRepository.findById(anyInt())).thenReturn(Optional.empty());

        // 존재하지 않는 댓글을 수정하려고 할 때 CommentNotFoundException이 발생하는지 확인합니다.
        assertThrows(CommentNotFoundException.class,
            () -> commentService.modifyComment(1, "testUser", requestDto));
    }

    @Test
    void testDeleteCommentSuccess() {
        // 댓글 삭제 성공 테스트
        // 댓글 조회 메서드가 올바른 댓글 엔티티를 반환하도록 설정합니다.
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        // 댓글 삭제 서비스 메서드를 호출하고 예외가 발생하지 않는지 확인합니다.
        assertDoesNotThrow(() -> commentService.deleteComment(1, "testUser"));
        // 댓글 저장소의 삭제 메서드가 호출되었는지 확인합니다.
        verify(commentRepository, times(1)).delete(comment);
    }

    @Test
    void testDeleteCommentUnauthorized() {
        // 댓글 삭제 시 권한 없는 사용자 예외 테스트
        // 댓글 조회 메서드가 올바른 댓글 엔티티를 반환하도록 설정합니다.
        when(commentRepository.findById(anyInt())).thenReturn(Optional.of(comment));

        // 권한이 없는 사용자가 댓글을 삭제하려고 할 때 UnauthorizedAccessException이 발생하는지 확인합니다.
        assertThrows(UnauthorizedAccessException.class,
            () -> commentService.deleteComment(1, "wrongUser"));
    }

    @Test
    void testDeleteCommentNotFound() {
        // 댓글 삭제 시 댓글을 찾지 못하는 경우 예외 테스트
        // 댓글 조회 메서드가 빈 Optional을 반환하도록 설정합니다.
        when(commentRepository.findById(anyInt())).thenReturn(Optional.empty());

        // 존재하지 않는 댓글을 삭제하려고 할 때 CommentNotFoundException이 발생하는지 확인합니다.
        assertThrows(CommentNotFoundException.class,
            () -> commentService.deleteComment(1, "testUser"));
    }

    @Test
    void testGetCommentList() {
        // 특정 게시글에 대한 댓글 목록 조회 테스트
        // 댓글 저장소의 findAll 메서드가 댓글 목록을 반환하도록 설정합니다.
        when(commentRepository.findAll()).thenReturn(Arrays.asList(comment));

        // 댓글 목록 조회 서비스 메서드를 호출합니다.
        List<TeamBoardCommentResponseDto> commentList = commentService.getCommentList(1);

        // 반환된 댓글 목록의 크기가 예상과 일치하는지 확인합니다.
        assertEquals(1, commentList.size());
        // 댓글 저장소의 findAll 메서드가 한 번 호출되었는지 확인합니다.
        verify(commentRepository, times(1)).findAll();
    }
}
