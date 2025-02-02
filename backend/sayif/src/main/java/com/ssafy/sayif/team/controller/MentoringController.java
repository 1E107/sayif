package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.*;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.service.MentoringService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mentoring")
public class MentoringController {


    private final MentoringService mentoringService;

    @PostMapping("/recruit")
    public ResponseEntity<?> recruit(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody MentoringRecruitRequest mentoringRecruitRequest) {
        String username = userDetails.getUsername();
        Team res = mentoringService.recruit(mentoringRecruitRequest, username);
        return ResponseEntity.ok(res);
    }


    @PostMapping("/search/{page_no}/{size_no}")
    public ResponseEntity<?> search(@RequestBody MentoringSearchRequest mentoringSearchRequest,
        @PathVariable int page_no, @PathVariable int size_no) {
        List<MentoringSearchResponse> mentorList = mentoringService.search(mentoringSearchRequest,
            page_no, size_no);
        return ResponseEntity.ok(mentorList);
    }

    @PostMapping("/application")
    public ResponseEntity<?> application(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody MentoringApplicationRequest mentoringApplicationRequest) {
        String username = userDetails.getUsername();
        int res = mentoringService.application(mentoringApplicationRequest, username);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/profile/{page_no}/{size_no}")
    public ResponseEntity<?> profile(@PathVariable("page_no") int page_no,
        @PathVariable("size_no") int size_no) {
        List<MentorProfileResponse> mentorList = mentoringService.profile(page_no, size_no);
        return ResponseEntity.ok(mentorList);
    }

    @GetMapping("/team/{id}")
    public ResponseEntity<?> getTeamStatus(@PathVariable Integer id) {
        TeamStatusResponse status = mentoringService.getTeamStatus(id);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/mentor-nickname")
    public ResponseEntity<?> getMentorNicknames() {
        List<MentorNicknameResponse> nicknameList = mentoringService.getMentorNicknames();
        return ResponseEntity.ok(nicknameList);
    }

    @GetMapping("/session/{id}")
    public ResponseEntity<?> getTeamSession(@PathVariable Integer id) {
        TeamSessionResponse sessionId = mentoringService.getTeamSession(id);
        return ResponseEntity.ok(sessionId);
    }

    @GetMapping("/team-info/{id}")
    public ResponseEntity<?> getTeamInfo(@PathVariable Integer id) {
        return ResponseEntity.ok(mentoringService.getMentoringInfo(id));
    }

    // 멘토 프로필 조회
    @GetMapping("/profile")
    public ResponseEntity<MentorProfileResponse> getMentorProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        MentorProfileResponse mentorProfile = mentoringService.getMentorProfileByUsername(username);
        return ResponseEntity.ok(mentorProfile);
    }

    @PutMapping("/profile")
    public ResponseEntity<Void> updateMentorProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody MentorProfileUpdateRequest profileUpdateRequest) {
        String username = userDetails.getUsername();
        mentoringService.updateMentorProfileByUsername(username, profileUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/plan/{id}")
    public ResponseEntity<?> getMentoringPlan(@PathVariable Integer id) {
        MentoringSearchResponse mentoringSearchResponse = mentoringService.getMentoringPlan(id);
        return ResponseEntity.ok(mentoringSearchResponse);
    }
}
