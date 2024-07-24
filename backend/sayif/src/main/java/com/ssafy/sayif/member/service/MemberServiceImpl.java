package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Boolean registerMember(RegisterRequestDto registerRequestDto) {
        String memberId = registerRequestDto.getMemberId();
        String pwd = registerRequestDto.getPassword();

        if (memberRepository.existsByMemberId(memberId)) return false;
        Member member = new Member();
        member.setMemberId(memberId);
        member.setPassword(bCryptPasswordEncoder.encode(pwd));
        member.setNickname(registerRequestDto.getNickname());
        member.setGender(registerRequestDto.getGender());
        member.setEmail(registerRequestDto.getEmail());
        member.setPhone(registerRequestDto.getPhone());
        member.setRole(Role.Mentee);

        memberRepository.save(member);
        return true;
    }

    @Override
    public void updateMemberInfo(String memberId, MemberUpdateRequestDto updateRequestDto) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member != null) {
            if (updateRequestDto.getNickname() != null) member.setNickname(updateRequestDto.getNickname());
            if (updateRequestDto.getGender() != null) member.setGender(updateRequestDto.getGender());
            if (updateRequestDto.getEmail() != null) member.setEmail(updateRequestDto.getEmail());
            if (updateRequestDto.getPhone() != null) member.setPhone(updateRequestDto.getPhone());
            memberRepository.save(member);
        } else {
            throw new RuntimeException("Member not found");
        }
    }


    @Override
    public MemberInfoResponseDto getMemberInfo(String memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member != null) {
            return new MemberInfoResponseDto(
                    member.getMemberId(),
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

}
