package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.team.dto.TeamBoardCommentRequestDto;
import com.ssafy.sayif.team.entity.QnaAnswer;
import com.ssafy.sayif.team.service.TeamBoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    private final TeamBoardCommentService teamBoardCommentService;

    @PostMapping("/{boardId}")
    public ResponseEntity<?> writeTeamBoardComment(
        @PathVariable("boardId") int boardId,
        @RequestBody TeamBoardCommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = extractMemberIdFromHeader(authorizationHeader);
        dto.setUsername(username);
        dto.setTeamBoardId(boardId);
        teamBoardCommentService.writeComment(dto);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> modifyTeamBoardComment(
        @PathVariable("commentId") int commentId,
        @RequestBody TeamBoardCommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = extractMemberIdFromHeader(authorizationHeader);
        QnaAnswer comment = teamBoardCommentService.modifyComment(commentId, username, dto);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
        @PathVariable("commentId") int commentId,
        @RequestHeader("Authorization") String authorizationHeader) {
        String memberId = extractMemberIdFromHeader(authorizationHeader);
        teamBoardCommentService.deleteComment(commentId, memberId);
        return ResponseEntity.ok("댓글 삭제 성공");
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getComment(@PathVariable("boardId") int boardId) {
        return ResponseEntity.ok(teamBoardCommentService.getCommentList(boardId));
    }

    private String extractMemberIdFromHeader(String authorizationHeader) {
        return jwtUtil.getUsernameByHeader(authorizationHeader);
    }
}
