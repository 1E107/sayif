package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.team.dto.TeamPostRequestDto;
import com.ssafy.sayif.team.service.TeamBoardService;
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
@RequestMapping("/team/board")
public class TeamBoardController {

    private final TeamBoardService teamBoardService;
    private final JWTUtil jwtUtil;

    @PostMapping("/{teamId}")
    public ResponseEntity<?> writeTeamPost(
        @PathVariable("teamId") int teamId,
        @RequestBody TeamPostRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = getUsernameFromHeader(authorizationHeader);
        return ResponseEntity.ok(teamBoardService.writeTeamPost(username, teamId, dto));
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<?> modifyTeamPost(
        @PathVariable("boardId") int boardId,
        @RequestBody TeamPostRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = getUsernameFromHeader(authorizationHeader);
        return ResponseEntity.ok(teamBoardService.modifyTeamPost(username, boardId, dto));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> removeTeamPost(
        @PathVariable("boardId") int boardId,
        @RequestHeader("Authorization") String authorizationHeader) {
        String username = getUsernameFromHeader(authorizationHeader);
        if (teamBoardService.removeTeamPost(boardId, username)) {
            return ResponseEntity.ok("삭제가 성공적으로 되었습니다.");
        } else {
            return ResponseEntity.ok("삭제가 실패 했습니다.");
        }
    }

    @GetMapping("/{teamId}/{page}/{size}")
    public ResponseEntity<?> getTeamPostList(
        @PathVariable("teamId") int teamId,
        @PathVariable("page") int page,
        @PathVariable("size") int size) {
        return ResponseEntity.ok(teamBoardService.getTeamPostList(teamId, page, size));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getTeamPostDetail(@PathVariable("id") int id) {
        return ResponseEntity.ok(teamBoardService.getTeamPostDetail(id));
    }

    private String getUsernameFromHeader(String authorizationHeader) {
        return jwtUtil.getUsernameByHeader(authorizationHeader);
    }

}
