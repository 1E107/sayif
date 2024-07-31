package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.team.dto.TeamBoardCommentRequestDto;
import com.ssafy.sayif.team.dto.TeamBoardCommentResponseDto;
import com.ssafy.sayif.team.service.TeamBoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/board/comment")
public class TeamBoardCommentController {

    private final JWTUtil jwtUtil;
    private final TeamBoardCommentService commentService;

    // 댓글 작성
    @PostMapping("/{boardId}")
    public ResponseEntity<?> writeComment(
        @PathVariable("boardId") int boardId,
        @RequestBody TeamBoardCommentRequestDto commentRequestDto,
        @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            commentRequestDto.setUsername(username);
            commentRequestDto.setTeamBoardId(boardId);
            commentService.writeComment(commentRequestDto);
            return ResponseEntity.ok("댓글 작성 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("댓글 작성 실패: " + e.getMessage());
        }
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<?> modifyComment(
        @PathVariable("commentId") int commentId,
        @RequestBody TeamBoardCommentRequestDto commentRequestDto,
        @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            TeamBoardCommentResponseDto updatedComment = commentService.modifyComment(commentId,
                username,
                commentRequestDto);
            return ResponseEntity.ok("댓글 수정 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("댓글 수정 실패: " + e.getMessage());
        }
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
        @PathVariable("commentId") int commentId,
        @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            commentService.deleteComment(commentId, username);
            return ResponseEntity.ok("댓글 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("댓글 삭제 실패: " + e.getMessage());
        }
    }

    // 댓글 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<?> getComments(@PathVariable("boardId") int boardId) {
        try {
            return ResponseEntity.ok(commentService.getCommentList(boardId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("댓글 조회 실패: " + e.getMessage());
        }
    }
}
