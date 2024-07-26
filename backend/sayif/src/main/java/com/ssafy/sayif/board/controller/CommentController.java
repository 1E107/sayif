package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.CommentRequestDto;
import com.ssafy.sayif.board.service.CommentService;
import com.ssafy.sayif.member.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public void writeComment(@PathVariable("boardId") int boardId,
        @RequestBody CommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtUtil.getUsernameByHeader(authorizationHeader);
        dto.setUsername(username);
        dto.setBoardId(boardId);
        commentService.writeComment(dto);
    }

    @PutMapping("/modify/{commentId}")
    public void modifyComment(
        @PathVariable("commentId") int commentId,
        @RequestBody CommentRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtUtil.getUsernameByHeader(authorizationHeader);
        commentService.modifyComment(commentId, username, dto);
    }
}
