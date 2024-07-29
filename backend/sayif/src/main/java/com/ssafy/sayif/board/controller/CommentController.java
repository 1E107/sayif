package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.service.CommentService;
import com.ssafy.sayif.member.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private final JWTUtil jwtUtil;

    @PostMapping("/{boardId}")
    public ResponseEntity<?> writeComment(
        @PathVariable("boardId") int boardId,
        @RequestBody CommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtUtil.getUsernameByHeader(authorizationHeader);
        dto.setUsername(username);
        dto.setBoardId(boardId);
        commentService.writeComment(dto);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> modifyComment(
        @PathVariable("commentId") int commentId,
        @RequestBody CommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String memberId = extractMemberIdFromHeader(authorizationHeader);
        commentService.modifyComment(commentId, memberId, dto);
        return ResponseEntity.ok("댓글 수정 성공");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
        @PathVariable("commentId") int commentId,
        @RequestHeader("Authorization") String authorizationHeader) {
        String memberId = extractMemberIdFromHeader(authorizationHeader);
        commentService.deleteComment(commentId, memberId);
        return ResponseEntity.ok("댓글 삭제 성공");
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getComment(@PathVariable("boardId") int boardId) {
        return ResponseEntity.ok(commentService.getCommentList(boardId));
    }

    private String extractMemberIdFromHeader(String authorizationHeader) {
        return jwtUtil.getUsernameByHeader(authorizationHeader);
    }
}
