package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.team.dto.*;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.service.MentoringService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mentoring")
public class MentoringController {


    private final MentoringService mentoringService;
    private final JWTUtil jwtUtil;

    @PostMapping("/recruit")
    public ResponseEntity<?> recruit(@RequestHeader("Authorization") String authorizationHeader,
        @RequestBody MentoringRecruitRequest mentoringRecruitRequest) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        if (token != null && !jwtUtil.isExpired(token)) {
            String username = jwtUtil.getUsername(token);
            Team res = mentoringService.recruit(mentoringRecruitRequest, username);
            return ResponseEntity.ok(res);
        } else {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }

    }


    @PostMapping("/search/{page_no}/{size_no}")
    public ResponseEntity<?> search(@RequestBody MentoringSearchRequest mentoringSearchRequest,
        @PathVariable int page_no, @PathVariable int size_no) {
        List<MentoringSearchResponse> mentorList = mentoringService.search(mentoringSearchRequest,
            page_no, size_no);
        return ResponseEntity.ok(mentorList);
    }

    @PostMapping("/application")
    public ResponseEntity<?> application(@RequestHeader("Authorization") String authorizationHeader,
        @RequestBody MentoringApplicationRequest mentoringApplicationRequest) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        if (token != null && !jwtUtil.isExpired(token)) {
            String username = jwtUtil.getUsername(token);

            int res = mentoringService.application(mentoringApplicationRequest, username);
            return ResponseEntity.ok(res);
        } else {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }

    }

    @GetMapping("/profile/{page_no}/{size_no}")
    public ResponseEntity<?> profile(@PathVariable int page_no, @PathVariable int size_no){
        List<MentorProfileResponse> mentorList = mentoringService.profile(page_no, size_no);
        return ResponseEntity.ok(mentorList);
    }

    @GetMapping("/team/{id}")
    public ResponseEntity<?> readStatus(@PathVariable Integer id) {
        TeamStatusResponse status = mentoringService.readStatus(id);
        return ResponseEntity.ok(status);
    }

}
