package com.ssafy.sayif.member.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.argThat;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentee;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.HistoryRepository;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.repository.RefreshRepository;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MenteeRepository menteeRepository;

    @Mock
    private RefreshRepository refreshRepository;

    @Mock
    private HistoryRepository historyRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("회원 가입 성공 테스트")
    void testRegisterMember() {
        // given
        RegisterRequestDto registerRequestDto = new RegisterRequestDto();
        registerRequestDto.setUsername("testuser");
        registerRequestDto.setPassword("password");
        registerRequestDto.setNickname("nickname");
        registerRequestDto.setGender("M");
        registerRequestDto.setEmail("test@test.com");
        registerRequestDto.setPhone("010-1234-5678");
        when(memberRepository.existsByUsername(anyString())).thenReturn(false);
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // when
        Boolean result = memberService.registerMember(registerRequestDto);

        // then
        assertTrue(result);
        verify(menteeRepository, times(1)).save(any(Mentee.class));
        verify(menteeRepository).save(argThat(member ->
            member.getUsername().equals("testuser") &&
                member.getPassword().equals("encodedPassword") &&
                member.getNickname().equals("nickname") &&
                member.getGender().equals("M") &&
                member.getEmail().equals("test@test.com") &&
                member.getPhone().equals("010-1234-5678")
        ));
    }

    @Test
    @DisplayName("회원 정보 업데이트 테스트")
    void testUpdateMemberInfo() {
        // given
        MemberUpdateRequestDto updateRequestDto = new MemberUpdateRequestDto();
        updateRequestDto.setNickname("newNickname");
        updateRequestDto.setGender("F");
        updateRequestDto.setEmail("new@test.com");
        updateRequestDto.setPhone("010-8765-4321");
        String username = "testuser";

        // when
        memberService.updateMemberInfo(username, updateRequestDto);

        // then
        verify(memberRepository, times(1)).updateMember(
            eq(username),
            eq("newNickname"),
            eq("F"),
            eq("new@test.com"),
            eq("010-8765-4321")
        );
    }

    @Test
    @DisplayName("회원 삭제 테스트")
    void testDeleteMember() {
        // given
        String username = "testuser";
        Member member = new Member();
        when(memberRepository.findByUsername(username)).thenReturn(member);

        // 등록된 회원을 삭제
        memberService.deleteMember(username);

        // then
        verify(memberRepository, times(1)).delete(member);

        // 삭제 후 회원이 존재하지 않는지 확인
        when(memberRepository.findByUsername(username)).thenReturn(null);
        assertNull(memberRepository.findByUsername(username));
    }

    @Test
    @DisplayName("회원 정보 조회 테스트")
    void testGetMemberInfo() {
        // given
        String username = "testuser";
        Member member = Member.builder()
            .username("testuser")
            .name("Test User")
            .nickname("nickname")
            .gender("M")
            .phone("010-1234-5678")
            .email("test@test.com")
            .profileImg("profile.jpg")
            .role(Role.Mentee)
            .build();
        when(memberRepository.findByUsername(anyString())).thenReturn(member);

        // when
        MemberInfoResponseDto result = memberService.getMemberInfo(username);

        // then
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("Test User", result.getName());
        assertEquals("nickname", result.getNickname());
        assertEquals("M", result.getGender());
        assertEquals("010-1234-5678", result.getPhone());
        assertEquals("test@test.com", result.getEmail());
        assertEquals("profile.jpg", result.getProfileImg());
    }

    @Test
    @DisplayName("멘토링 기록 조회 테스트")
    void testGetMentoringRecords() {
        // given
        String username = "testuser";
        Member member = new Member();
        when(memberRepository.findByUsername(anyString())).thenReturn(member);
        when(historyRepository.findByMemberId(anyInt())).thenReturn(Collections.emptyList());

        // when
        List<MentoringRecordResponseDto> result = memberService.getMentoringRecords(username);

        // then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("회원 존재 여부 확인 테스트")
    void testIsMemberExists() {
        // given
        String username = "testuser";
        Member member = new Member();
        when(memberRepository.findByUsername(anyString())).thenReturn(member);

        // when
        boolean result = memberService.isMemberExists(username);

        // then
        assertTrue(result);
    }

    @Test
    @DisplayName("비밀번호 업데이트 테스트")
    void testUpdatePassword() {
        // given
        String username = "testuser";
        String newPwd = "newpassword";
        String newPwdCheck = "newpassword";
        Member member = new Member();
        when(memberRepository.findByUsername(anyString())).thenReturn(member);
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // when
        boolean result = memberService.updatePassword(username, newPwd, newPwdCheck);

        // then
        assertTrue(result);
        verify(memberRepository).save(argThat(updatedMember ->
            updatedMember.getPassword().equals("encodedPassword")
        ));
    }
}