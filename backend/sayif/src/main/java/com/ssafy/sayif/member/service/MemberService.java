package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.History;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.HistoryRepository;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.RefreshRepository;
import com.ssafy.sayif.team.entity.Team;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;
    private final HistoryRepository historyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Boolean registerMember(RegisterRequestDto registerRequestDto) {
        String username = registerRequestDto.getUsername();
        String pwd = registerRequestDto.getPassword();

        if (memberRepository.existsByUsername(username)) {
            return false;
        }
        Member member = new Member();
        member.setUsername(username);
        member.setPassword(bCryptPasswordEncoder.encode(pwd));
        member.setNickname(registerRequestDto.getNickname());
        member.setGender(registerRequestDto.getGender());
        member.setEmail(registerRequestDto.getEmail());
        member.setPhone(registerRequestDto.getPhone());
        member.setRole(Role.Mentee);

        memberRepository.save(member);
        return true;
    }

    public void updateMemberInfo(String username, MemberUpdateRequestDto updateRequestDto) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            if (updateRequestDto.getNickname() != null) {
                member.setNickname(updateRequestDto.getNickname());
            }
            if (updateRequestDto.getGender() != null) {
                member.setGender(updateRequestDto.getGender());
            }
            if (updateRequestDto.getEmail() != null) {
                member.setEmail(updateRequestDto.getEmail());
            }
            if (updateRequestDto.getPhone() != null) {
                member.setPhone(updateRequestDto.getPhone());
            }
            memberRepository.save(member);
        } else {
            throw new RuntimeException("Member not found");
        }
    }

    public void deleteMember(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            memberRepository.delete(member);
//            deleteRefreshTokens(username);
        } else {
            throw new RuntimeException("Member not found");
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
            // 예외 처리 로직 추가 (예: 회원을 찾을 수 없을 때)
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
        member.setPassword(bCryptPasswordEncoder.encode(newPwd));
        memberRepository.save(member);
        return true; // 비밀번호 변경됨
    }
}
