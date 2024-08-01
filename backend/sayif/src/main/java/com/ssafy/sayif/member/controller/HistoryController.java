package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class HistoryController {

    private final MemberService memberService;

    @GetMapping("/mentoring-record")
    public ResponseEntity<List<MentoringRecordResponseDto>> getMentoringRecords(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<MentoringRecordResponseDto> mentoringRecords = memberService.getMentoringRecords(
                username);
        return ResponseEntity.ok(mentoringRecords);
    }

}
