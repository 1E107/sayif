//package com.ssafy.sayif.member.service;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//import com.ssafy.sayif.common.entity.Letter;
//import com.ssafy.sayif.member.dto.LetterResponseDto;
//import com.ssafy.sayif.member.entity.Member;
//import com.ssafy.sayif.member.repository.LetterRepository;
//import com.ssafy.sayif.member.repository.MemberRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.Pageable;
//
//import java.time.LocalDateTime;
//import java.util.Collections;
//import java.util.Optional;
//
//public class LetterServiceTest {
//    @Mock
//    private LetterRepository letterRepository;
//
//    @Mock
//    private MemberRepository memberRepository;
//
//    @InjectMocks
//    private LetterService letterService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    @DisplayName("편지 보내기 테스트")
//    void testSendLetter() {
//        // given
//        String title = "Test Title";
//        String content = "Test Content";
//        String senderId = "sender";
//        String receiverId = "receiver";
//
//        Member sender = Member.builder().username(senderId).build();
//        Member receiver = Member.builder().username(receiverId).build();
//
//        when(memberRepository.findByUsername(senderId)).thenReturn(sender);
//        when(memberRepository.findByUsername(receiverId)).thenReturn(receiver);
//
//        // when
//        letterService.sendLetter(title, content, senderId, receiverId);
//
//        // then
//        verify(letterRepository, times(1)).save(argThat(letter ->
//                title.equals(letter.getTitle()) &&
//                        content.equals(letter.getContent()) &&
//                        sender.equals(letter.getSendMember()) &&
//                        receiver.equals(letter.getReceiveMember())
//        ));
//    }
//
//    @Test
//    @DisplayName("편지 ID로 편지 조회 테스트")
//    void testGetLetterById() {
//        // given
//        int letterId = 1;
//        String username = "receiver";
//        Member sender = Member.builder().username("sender").build();
//        Member receiver = Member.builder().username(username).build();
//        Letter letter = Letter.builder()
//                .id(letterId)
//                .title("Test Title")
//                .content("Test Content")
//                .sendMember(sender)
//                .receiveMember(receiver)
//                .createdAt(LocalDateTime.now())
//                .modifiedAt(LocalDateTime.now())
//                .build();
//
//        when(letterRepository.findById(letterId)).thenReturn(Optional.of(letter));
//
//        // when
//        LetterResponseDto result = letterService.getLetterById(letterId, username);
//
//        // then
//        assertNotNull(result);
//        assertEquals(letterId, result.getId());
//        assertEquals("Test Title", result.getTitle());
//        assertEquals("Test Content", result.getContent());
//        assertEquals("sender", result.getSendId());
//        assertEquals(username, result.getReceiveId());
//    }
//
//    @Test
//    @DisplayName("편지 조회 권한이 없는 경우 예외 처리")
//    void testGetLetterByIdUnauthorized() {
//        // given
//        int letterId = 1;
//        String username = "unauthorized";
//        Member sender = Member.builder().username("sender").build();
//        Member receiver = Member.builder().username("receiver").build();
//        Letter letter = Letter.builder()
//                .id(letterId)
//                .title("Test Title")
//                .content("Test Content")
//                .sendMember(sender)
//                .receiveMember(receiver)
//                .build();
//
//        when(letterRepository.findById(letterId)).thenReturn(Optional.of(letter));
//
//        // when, then
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
//                letterService.getLetterById(letterId, username)
//        );
//        assertEquals("해당 편지를 볼 권한이 없습니다.", exception.getMessage());
//    }
//
//    @Test
//    @DisplayName("받은 편지 목록 조회 테스트")
//    void testGetReceivedLetters() {
//        // given
//        String username = "receiver";
//        Member member = Member.builder().username(username).id(1).build();
//        Letter letter = Letter.builder()
//                .id(1)
//                .title("Test Title")
//                .content("Test Content")
//                .sendMember(Member.builder().username("sender").build())
//                .receiveMember(member)
//                .createdAt(LocalDateTime.now())
//                .modifiedAt(LocalDateTime.now())
//                .build();
//
//        Page<Letter> letterPage = new PageImpl<>(Collections.singletonList(letter));
//        when(memberRepository.findByUsername(username)).thenReturn(member);
//        when(letterRepository.findByReceiveMemberIdOrderByCreatedAtDesc(member.getId(), Pageable.unpaged())).thenReturn(letterPage);
//
//        // when
//        Page<LetterResponseDto> result = letterService.getReceivedLetters(username, Pageable.unpaged());
//
//        // then
//        assertNotNull(result);
//        assertEquals(1, result.getTotalElements());
//        LetterResponseDto dto = result.getContent().get(0);
//        assertEquals(1, dto.getId());
//        assertEquals("Test Title", dto.getTitle());
//        assertEquals("Test Content", dto.getContent());
//        assertEquals("sender", dto.getSendId());
//        assertEquals(username, dto.getReceiveId());
//    }
//}
