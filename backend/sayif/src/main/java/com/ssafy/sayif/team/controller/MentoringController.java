package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.team.dto.*;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.service.MentoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/mentoring")
public class MentoringController {


    private final MentoringService mentoringService;
    private final JWTUtil jwtUtil;

    @PostMapping("/recruit")
    public ResponseEntity<?> recruit(@RequestHeader("Authorization") String authorizationHeader, @RequestBody MentoringRecruitRequest mentoringRecruitRequest){
        String token = jwtUtil.resolveToken(authorizationHeader);
        if (token != null && !jwtUtil.isExpired(token)) {
            String memberId = jwtUtil.getMemberId(token);

            Team res = mentoringService.recruit(mentoringRecruitRequest, memberId);
            return ResponseEntity.ok(res);
        } else {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }

    }

    @PostMapping("/search/{page_no}/{size_no}")
    public ResponseEntity<?> search(@RequestBody MentoringSearchRequest mentoringSearchRequest, @PathVariable int page_no, @PathVariable int size_no){
            List<MentoringSearchResponse> mentorList = mentoringService.search(mentoringSearchRequest, page_no, size_no);
            return ResponseEntity.ok(mentorList);
    }

    @PostMapping("/application")
    public ResponseEntity<?> application(@RequestHeader("Authorization") String authorizationHeader, @RequestBody MentoringApplicationRequest mentoringApplicationRequest){
        String token = jwtUtil.resolveToken(authorizationHeader);
        if (token != null && !jwtUtil.isExpired(token)) {
            String memberId = jwtUtil.getMemberId(token);

            int res = mentoringService.application(mentoringApplicationRequest, memberId);
            return ResponseEntity.ok(res);
        } else {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }

    }

//    @GetMapping("/profile/{page_no}/{size_no}")
//    public ResponseEntity<?> profile(@PathVariable int page_no, @PathVariable int size_no){
//        List<MentorProfileResponse> mentorList = mentoringService.profile(page_no, size_no);
//        return ResponseEntity.ok(mentorList);
//    }

}
