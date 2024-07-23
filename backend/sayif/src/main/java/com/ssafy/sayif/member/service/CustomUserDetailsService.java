package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.CustomUserDetails;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.catalina.UserDatabase;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        System.out.println("memberId = " + memberId);
        Member memberData = memberRepository.findByMemberId(memberId);

        if (memberData != null) {
            return new CustomUserDetails(memberData);
        }
        return null;
    }
}
