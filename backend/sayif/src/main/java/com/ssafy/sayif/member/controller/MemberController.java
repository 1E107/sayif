package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.member.dto.*;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.member.service.LetterService;
import com.ssafy.sayif.member.service.MemberService;

import com.ssafy.sayif.member.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final LetterService letterService;
    private final TagService tagService;
    private final JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto registerRequestDto) {
        // 회원가입 여부 확인
        boolean isRegistered = memberService.registerMember(registerRequestDto);
        if (isRegistered) {
            return ResponseEntity.ok("회원가입 성공.");
        } else {
            return ResponseEntity.status(400).body("회원가입 실패. 이미 존재하는 ID 입니다.");
        }
    }

    @GetMapping("/member-info")
    public ResponseEntity<?> getMemberInfo(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return ResponseEntity.ok(memberService.getMemberInfo(username));
    }

    @PutMapping("/member-info")
    public ResponseEntity<?> updateMemberInfo(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody MemberUpdateRequestDto updateRequestDto) {
        String username = userDetails.getUsername();
        memberService.updateMember(username, updateRequestDto);
        return ResponseEntity.ok("멤버 정보 수정 성공");
    }

    @DeleteMapping("/member-info")
    public ResponseEntity<?> deleteMemberInfo(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        memberService.deleteMember(username);
        return ResponseEntity.ok("회원탈퇴 성공");
    }
    
    @PostMapping("/password-change")
    public ResponseEntity<?> findChange(@RequestBody UsernameRequestDto request) {
        boolean exists = memberService.isMemberExists(request.getUsername());
        if (exists) {
            // 이메일 전송으로 비번 인증
            return ResponseEntity.ok("Member exists.");
        } else {
            return ResponseEntity.status(404).body("Member not found.");
        }
    }

    @PutMapping("/password-change")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequestDto request) {
        boolean isUpdated = memberService.updatePassword(request.getUsername(), request.getNewPwd(),
            request.getNewPwdCheck());

        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest()
                .body("Password update failed. Please check if passwords match and member exists.");
        }
    }
}
