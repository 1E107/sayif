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

    /**
     * 팀 게시글 작성
     *
     * @param teamId              팀 ID
     * @param dto                 게시글 작성 요청 DTO
     * @param authorizationHeader 인증 헤더
     * @return 작성된 게시글 정보
     */
    @PostMapping("/{teamId}")
    public ResponseEntity<?> writeTeamPost(
        @PathVariable("teamId") int teamId,
        @RequestBody TeamPostRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String username = getUsernameFromHeader(authorizationHeader);
            return ResponseEntity.ok(teamBoardService.writeTeamPost(username, teamId, dto));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 작성 실패: " + e.getMessage());
        }
    }

    /**
     * 팀 게시글 수정
     *
     * @param boardId             게시글 ID
     * @param dto                 게시글 수정 요청 DTO
     * @param authorizationHeader 인증 헤더
     * @return 수정된 게시글 정보
     */
    @PutMapping("/{boardId}")
    public ResponseEntity<?> modifyTeamPost(
        @PathVariable("boardId") int boardId,
        @RequestBody TeamPostRequestDto dto,
        @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String username = getUsernameFromHeader(authorizationHeader);
            return ResponseEntity.ok(teamBoardService.modifyTeamPost(username, boardId, dto));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 수정 실패: " + e.getMessage());
        }
    }

    /**
     * 팀 게시글 삭제
     *
     * @param boardId             게시글 ID
     * @param authorizationHeader 인증 헤더
     * @return 삭제 결과 메시지
     */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> removeTeamPost(
        @PathVariable("boardId") int boardId,
        @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String username = getUsernameFromHeader(authorizationHeader);
            if (teamBoardService.removeTeamPost(boardId, username)) {
                return ResponseEntity.ok("삭제가 성공적으로 되었습니다.");
            } else {
                return ResponseEntity.status(500).body("삭제가 실패 했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 삭제 실패: " + e.getMessage());
        }
    }

    /**
     * 팀 게시글 목록 조회
     *
     * @param teamId 팀 ID
     * @param page   페이지 번호
     * @param size   페이지 크기
     * @return 팀 게시글 목록
     */
    @GetMapping("/{teamId}/{page}/{size}")
    public ResponseEntity<?> getTeamPostList(
        @PathVariable("teamId") int teamId,
        @PathVariable("page") int page,
        @PathVariable("size") int size) {
        try {
            return ResponseEntity.ok(teamBoardService.getTeamPostList(teamId, page, size));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 목록 조회 실패: " + e.getMessage());
        }
    }

    /**
     * 팀 게시글 상세 조회
     *
     * @param id 게시글 ID
     * @return 팀 게시글 상세 정보
     */
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getTeamPostDetail(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(teamBoardService.getTeamPostDetail(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 상세 조회 실패: " + e.getMessage());
        }
    }

    /**
     * 인증 헤더에서 사용자 이름 추출
     *
     * @param authorizationHeader 인증 헤더
     * @return 사용자 이름
     */
    private String getUsernameFromHeader(String authorizationHeader) {
        return jwtUtil.getUsernameByHeader(authorizationHeader);
    }
}
