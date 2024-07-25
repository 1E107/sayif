package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> writePost(@RequestBody WritePostRequestDto dto) {
        return ResponseEntity.ok(boardService.writePost(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyPost(@PathVariable("id") int id,
        @RequestBody ModifyPostRequestDto dto) {
        return ResponseEntity.ok(boardService.modifyPost(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removePost(@PathVariable("id") int id) {
        if (boardService.removePost(id)) {
            return ResponseEntity.ok("삭제가 성공적으로 되었습니다.");
        } else {
            return ResponseEntity.ok("이미 삭제된 게시물입니다.");
        }
    }

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getPostList(@PathVariable("page") int page,
        @PathVariable("size") int size) {
        return ResponseEntity.ok(boardService.getPostList(page, size));
    }
}
