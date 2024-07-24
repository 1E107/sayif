package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.MentoringApplicationRequest;
import com.ssafy.sayif.team.dto.MentoringRecruitRequest;
import com.ssafy.sayif.team.dto.MentoringSearchRequest;
import com.ssafy.sayif.team.dto.MentoringSearchResponse;
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

    @PostMapping("/recruit")
    public ResponseEntity<?> recruit(@RequestBody MentoringRecruitRequest mentoringRecruitRequest){
        Team res = mentoringService.recruit(mentoringRecruitRequest);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/search/{page_no}/{size_no}")
    public ResponseEntity<?> search(@RequestBody MentoringSearchRequest mentoringSearchRequest, @PathVariable int page_no, @PathVariable int size_no){
        List<MentoringSearchResponse> mentorList = mentoringService.search(mentoringSearchRequest, page_no, size_no);
        return ResponseEntity.ok(mentorList);
    }

    @PostMapping("/application")
    public ResponseEntity<?> application(@RequestBody MentoringApplicationRequest mentoringApplicationRequest){
        int res = mentoringService.application(mentoringApplicationRequest);
        return ResponseEntity.ok(res);
    }

}
