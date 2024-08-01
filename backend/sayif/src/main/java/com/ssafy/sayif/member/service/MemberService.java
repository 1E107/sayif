package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.*;
import com.ssafy.sayif.member.repository.HistoryRepository;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.repository.RefreshRepository;
import com.ssafy.sayif.team.entity.Team;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;
    private final HistoryRepository historyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MenteeRepository menteeRepository;

    public Boolean registerMember(RegisterRequestDto registerRequestDto) {
        String username = registerRequestDto.getUsername();
        String pwd = registerRequestDto.getPassword();
        
        // 중복 아이디 존재
        if (memberRepository.existsByUsername(username)) {
            return false;
        }

        Mentee mentee = Mentee.builder()
                .username(username)
                .password(bCryptPasswordEncoder.encode(pwd))
                .name(registerRequestDto.getName())
                .nickname(registerRequestDto.getNickname())
                .gender(registerRequestDto.getGender())
                .email(registerRequestDto.getEmail())
                .phone(registerRequestDto.getPhone())
                .role(Role.Mentee)
                .authFile(registerRequestDto.getAuthFile())
                .status(Status.Pending)
                .build();
        menteeRepository.save(mentee);

        return true;
    }

    @Transactional
    public void updateMemberInfo(String username, MemberUpdateRequestDto updateRequestDto) {
        memberRepository.updateMember(
                username,
                updateRequestDto.getNickname(),
                updateRequestDto.getGender(),
                updateRequestDto.getEmail(),
                updateRequestDto.getPhone()
        );
    }

    public void deleteMember(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            memberRepository.delete(member);
//            deleteRefreshTokens(username);
        } else {
            throw new RuntimeException("존재하지 않는 회원입니다.");
        }
    }

    public void deleteRefreshTokens(String username) {
        System.out.println(username);
        refreshRepository.deleteByUsername(username);
    }


    public MemberInfoResponseDto getMemberInfo(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            return new MemberInfoResponseDto(
                member.getUsername(),
                member.getName(),
                member.getNickname(),
                member.getGender(),
                member.getPhone(),
                member.getEmail(),
                member.getProfileImg(),
                member.getRole().name(),
                member.getTeam() != null ? member.getTeam().getId() : null
            );
        } else {
            throw new RuntimeException("Member not found");
        }
    }

    public List<MentoringRecordResponseDto> getMentoringRecords(String username) {
        // 멤버 조회
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }
        // 멘토링 이력 조회
        List<History> histories = historyRepository.findByMemberId(member.getId());
        // DTO로 변환
        List<MentoringRecordResponseDto> list = new ArrayList<>();
        for (History history : histories) {
            Team team = history.getTeam();
            MentoringRecordResponseDto apply = new MentoringRecordResponseDto(
                team.getName(),
                team.getStartDate().toString(),
                team.getEndDate().toString(),
                history.getReview()
            );
            list.add(apply);
        }
        return list;

    }

    public boolean isMemberExists(String username) {
        Member member = memberRepository.findByUsername(username);
        return member != null;
    }

    public boolean updatePassword(String username, String newPwd, String newPwdCheck) {
        if (!newPwd.equals(newPwdCheck)) {
            return false; // 비밀번호와 비밀번호 확인이 일치하지 않음
        }

        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            return false; // 회원을 찾을 수 없음
        }

        // 비밀번호 암호화
        member.updatePwd(bCryptPasswordEncoder.encode(newPwd));
        memberRepository.save(member);
        return true; // 비밀번호 변경됨
    }
}
