package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.common.entity.Letter;
import com.ssafy.sayif.member.dto.*;
import com.ssafy.sayif.member.entity.History;
import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.member.service.LetterService;
import com.ssafy.sayif.member.service.LetterServiceImpl;
import com.ssafy.sayif.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;
    private final LetterServiceImpl letterService;
    private final JWTUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDto registerRequestDto) {
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

    @DeleteMapping("/member-info")
    public String deleteMemberInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        String memberId = jwtUtil.getMemberId(token);
        memberService.deleteMember(memberId);
        return "success";
    }

    @GetMapping("/mentoring-record")
    public ResponseEntity<List<MentoringRecordResponseDto>> getMentoringRecords(@RequestHeader("Authorization") String authorizationHeader) {
        String token = jwtUtil.resolveToken(authorizationHeader);
        String memberId = jwtUtil.getMemberId(token);
        List<MentoringRecordResponseDto> mentoringRecords = memberService.getMentoringRecords(memberId);
        return ResponseEntity.ok(mentoringRecords);
    }

    @PostMapping("/password-change")
    public ResponseEntity<?> findChange(@RequestBody MemberIdRequestDto request) {
        boolean exists = memberService.isMemberExists(request.getMemberId());
        if (exists) {
            // 비밀번호 변경 로직을 여기에 추가합니다.
            return ResponseEntity.ok("Member exists.");
        } else {
            return ResponseEntity.status(404).body("Member not found.");
        }
    }

    @PutMapping("/password-change")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequestDto request) {
        boolean isUpdated = memberService.updatePassword(request.getMemberId(), request.getNewPwd(), request.getNewPwdCheck());

        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Password update failed. Please check if passwords match and member exists.");
        }
    }

    @PostMapping("/message")
    public ResponseEntity<String> sendLetter(@RequestBody LetterRequestDto request, @RequestHeader("Authorization") String authorizationHeader) {
        String senderId = jwtUtil.getMemberIdByHeader(authorizationHeader);
        letterService.sendLetter(request.getTitle(), request.getContent(), senderId, request.getReceiver());
        return ResponseEntity.ok("Message sent successfully.");
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<LetterResponseDto> getLetter(@PathVariable int id, @RequestHeader("Authorization") String authorizationHeader) {
        String memberId = jwtUtil.getMemberIdByHeader(authorizationHeader);
        LetterResponseDto letter = letterService.getLetterById(id, memberId);
        return ResponseEntity.ok(letter);
    }

    @GetMapping("/message/{page_no}/{size_no}")
    public ResponseEntity<Page<LetterResponseDto>> getReceivedLetters(@PathVariable int page_no,
                                                                      @PathVariable int size_no,
                                                                      @RequestHeader("Authorization") String authorizationHeader) {
        String memberId = jwtUtil.getMemberIdByHeader(authorizationHeader);
        Pageable pageable = PageRequest.of(page_no - 1, size_no); // 페이지 번호는 0부터 시작하므로 -1
        Page<LetterResponseDto> letters = letterService.getReceivedLetters(memberId, pageable);
        return ResponseEntity.ok(letters);
    }

}
