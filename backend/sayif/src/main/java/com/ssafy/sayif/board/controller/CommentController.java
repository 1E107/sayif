package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{boardId}")
    public ResponseEntity<?> writeComment(
        @PathVariable("boardId") int boardId,
        @RequestBody CommentRequestDto dto,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        commentService.writeComment(dto, boardId, username);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> modifyComment(
        @PathVariable("commentId") int commentId,
        @RequestBody CommentRequestDto dto,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        commentService.modifyComment(commentId, username, dto);
        return ResponseEntity.ok("댓글 수정 성공");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
        @PathVariable("commentId") int commentId,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        commentService.deleteComment(commentId, username);
        return ResponseEntity.ok("댓글 삭제 성공");
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getComment(@PathVariable("boardId") int boardId) {
        return ResponseEntity.ok(commentService.getCommentList(boardId));
    }
}
