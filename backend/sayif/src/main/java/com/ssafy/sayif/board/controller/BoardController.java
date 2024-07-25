package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.service.BoardService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
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
    public Optional<Board> writePost(@RequestBody WritePostRequestDto dto) {
        return boardService.writePost(dto);
    }

    @PutMapping("/{id}")
    public Optional<Board> modifyPost(@PathVariable("id") int id,
        @RequestBody ModifyPostRequestDto dto) {
        return boardService.modifyPost(id, dto);
    }
}
