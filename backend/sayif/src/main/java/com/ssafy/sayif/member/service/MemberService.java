package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentee;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean registerMember(RegisterRequestDto registerRequestDto) {
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


}
