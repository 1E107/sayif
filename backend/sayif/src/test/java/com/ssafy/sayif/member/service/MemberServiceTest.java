package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private MemberService memberService;

    public MemberServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("중복되지 않는 아이디는 회원가입에 성공해야한다.")
    public void testRegisterMemberSuccess() {
        RegisterRequestDto requestDto = new RegisterRequestDto();
        requestDto.setUsername("newuser");
        requestDto.setPassword("password123");
        requestDto.setName("New User");
        requestDto.setNickname("Newbie");
        requestDto.setGender("Male");
        requestDto.setPhone("010-1111-2222");
        requestDto.setEmail("newuser@example.com");

        // 설정된 회원 이름이 이미 존재하지 않는다고 가정
        Mockito.when(memberRepository.existsByUsername(requestDto.getUsername())).thenReturn(false);
        // BCryptPasswordEncoder를 사용하여 암호화된 비밀번호를 반환하도록 설정
        Mockito.when(bCryptPasswordEncoder.encode(requestDto.getPassword())).thenReturn("encryptedPassword");

        // 테스트 실행
        boolean result = memberService.registerMember(requestDto);

        // 결과 검증
        assertThat(result).isTrue();
        Mockito.verify(memberRepository).save(Mockito.any(Member.class));
    }

    @Test
    @DisplayName("중복된 아이디는 회원가입에 실패해야한다.")
    public void testRegisterMemberFailure() {
        RegisterRequestDto requestDto = new RegisterRequestDto();
        requestDto.setUsername("existinguser");
        requestDto.setPassword("password123");
        requestDto.setName("Existing User");
        requestDto.setNickname("Existing");
        requestDto.setGender("Female");
        requestDto.setPhone("010-3333-4444");
        requestDto.setEmail("existinguser@example.com");

        // 설정된 회원 이름이 이미 존재한다고 가정
        Mockito.when(memberRepository.existsByUsername(requestDto.getUsername())).thenReturn(true);

        // 테스트 실행
        boolean result = memberService.registerMember(requestDto);

        // 결과 검증
        assertThat(result).isFalse();
        Mockito.verify(memberRepository, Mockito.never()).save(Mockito.any(Member.class));
    }
}
