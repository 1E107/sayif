package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.service.GoodService;
import com.ssafy.sayif.member.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/good")
@RequiredArgsConstructor
public class GoodController {

    private final GoodService goodService;
    private final JWTUtil jwtUtil;

    @GetMapping("/{boardId}")
    public ResponseEntity<?> pushGood(@PathVariable int boardId,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtUtil.getUsernameByHeader(authorizationHeader);
        if (goodService.pushGood(boardId, username)) {
            return ResponseEntity.ok("좋아요 완료");
        } else {
            return ResponseEntity.ok("이미 좋아요를 눌렀습니다.");
        }
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> removeGood(@PathVariable int boardId,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtUtil.getUsernameByHeader(authorizationHeader);
        if (goodService.removeGood(boardId, username)) {
            return ResponseEntity.ok("좋아요 취소 완료");
        } else {
            return ResponseEntity.ok("좋아요 취소 실패");
        }
    }

}
