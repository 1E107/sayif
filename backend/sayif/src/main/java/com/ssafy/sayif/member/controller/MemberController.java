package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;
    private final JWTUtil jwtUtil;

    @PostMapping("/register")
    public String register(RegisterRequestDto registerRequestDto) {
        memberService.registerMember(registerRequestDto);
        return "success";
    }

    @GetMapping("/member-info")
    public MemberInfoResponseDto getMemberInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        if (token != null && !jwtUtil.isExpired(token)) {
            String memberId = jwtUtil.getMemberId(token);
            return memberService.getMemberInfo(memberId);
        } else {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }
    }

    @PutMapping("/member-info")
    public String updateMemberInfo(@RequestHeader("Authorization") String authorizationHeader,
                                   @RequestBody MemberUpdateRequestDto updateRequestDto) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        String memberId = jwtUtil.getMemberId(token);
        memberService.updateMemberInfo(memberId, updateRequestDto);
        return "success";
    }
}