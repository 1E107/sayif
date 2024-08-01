//package com.ssafy.sayif.team.service;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.anyInt;
//import static org.mockito.Mockito.anyString;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import com.ssafy.sayif.member.entity.Member;
//import com.ssafy.sayif.member.exception.MemberNotEqualException;
//import com.ssafy.sayif.member.exception.MemberNotFoundException;
//import com.ssafy.sayif.member.repository.MemberRepository;
//import com.ssafy.sayif.team.dto.TeamPostRequestDto;
//import com.ssafy.sayif.team.dto.TeamPostResponseDto;
//import com.ssafy.sayif.team.entity.Team;
//import com.ssafy.sayif.team.entity.TeamBoard;
//import com.ssafy.sayif.team.exception.TeamBoardNotFoundException;
//import com.ssafy.sayif.team.exception.TeamNotFoundException;
//import com.ssafy.sayif.team.repository.TeamBoardRepository;
//import com.ssafy.sayif.team.repository.TeamRepository;
//import java.util.Optional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.Captor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//@ExtendWith(MockitoExtension.class)
//class TeamBoardServiceTest {
//
//    @Mock
//    private TeamRepository teamRepository;
//
//    @Mock
//    private TeamBoardRepository teamBoardRepository;
//
//    @Mock
//    private MemberRepository memberRepository;
//
//    @InjectMocks
//    private TeamBoardService teamBoardService;
//
//    private Member member;
//    private Team team;
//    private TeamBoard teamBoard;
//
//    @Captor
//    private ArgumentCaptor<TeamBoard> teamBoardCaptor;
//
//    @BeforeEach
//    void setUp() {
//        member = Member.builder().username("testuser").build();
//        team = Team.builder().id(1).build();
//        teamBoard = TeamBoard.builder().id(1).member(member).team(team).title("Test Title")
//            .content("Test Content").build();
//    }
//
//    /**
//     * writeTeamPost 메서드 테스트
//     * <p>
//     * 새로운 팀 게시글을 작성하고, 저장된 게시글이 요청과 일치하는지 검증합니다.
//     */
//    @Test
//    void testWriteTeamPost() {
//        // Mock 설정
//        when(memberRepository.findByUsername(anyString())).thenReturn(member);
//        when(teamRepository.findById(anyInt())).thenReturn(Optional.of(team));
//        when(teamBoardRepository.save(any(TeamBoard.class))).thenReturn(teamBoard);
//
//        // 요청 DTO 생성
//        TeamPostRequestDto requestDto = TeamPostRequestDto.builder()
//            .title("Test Title")
//            .content("Test Content")
//            .build();
//
//        // 서비스 메서드 실행
//        TeamPostResponseDto responseDto = teamBoardService.writeTeamPost("testuser", 1, requestDto);
//
//        // 저장된 엔티티 검증
//        verify(teamBoardRepository, times(1)).save(teamBoardCaptor.capture());
//        TeamBoard savedTeamBoard = teamBoardCaptor.getValue();
//
//        // 결과 검증
//        assertEquals("Test Title", savedTeamBoard.getTitle());
//        assertEquals("Test Content", savedTeamBoard.getContent());
//        assertEquals("testuser", savedTeamBoard.getMember().getUsername());
//        assertNotNull(responseDto);
//        assertEquals("Test Title", responseDto.getTitle());
//        assertEquals("Test Content", responseDto.getContent());
//        assertEquals("testuser", responseDto.getWriter());
//    }
//
//    /**
//     * modifyTeamPost 메서드 테스트
//     * <p>
//     * 기존 팀 게시글을 수정하고, 수정된 게시글이 요청과 일치하는지 검증합니다.
//     */
//    @Test
//    void testModifyTeamPost() {
//        // Mock 설정
//        when(memberRepository.findByUsername(anyString())).thenReturn(member);
//        when(teamBoardRepository.findById(anyInt())).thenReturn(Optional.of(teamBoard));
//        when(teamBoardRepository.save(any(TeamBoard.class))).thenReturn(teamBoard);
//
//        // 요청 DTO 생성
//        TeamPostRequestDto requestDto = TeamPostRequestDto.builder()
//            .title("Updated Title")
//            .content("Updated Content")
//            .build();
//
//        // 서비스 메서드 실행
//        TeamPostResponseDto responseDto = teamBoardService.modifyTeamPost("testuser", 1,
//            requestDto);
//
//        // 저장된 엔티티 검증
//        verify(teamBoardRepository, times(1)).save(teamBoardCaptor.capture());
//        TeamBoard savedTeamBoard = teamBoardCaptor.getValue();
//
//        // 결과 검증
//        assertEquals("Updated Title", savedTeamBoard.getTitle());
//        assertEquals("Updated Content", savedTeamBoard.getContent());
//        assertNotNull(responseDto);
//        assertEquals("Updated Title", responseDto.getTitle());
//        assertEquals("Updated Content", responseDto.getContent());
//        assertEquals("testuser", responseDto.getWriter());
//    }
//
//    /**
//     * removeTeamPost 메서드 테스트
//     * <p>
//     * 팀 게시글을 삭제하고, 삭제가 성공적으로 이루어졌는지 검증합니다.
//     */
//    @Test
//    void testRemoveTeamPost() {
//        // Mock 설정
//        when(memberRepository.findByUsername(anyString())).thenReturn(member);
//        when(teamBoardRepository.findById(anyInt())).thenReturn(Optional.of(teamBoard));
//
//        // 서비스 메서드 실행
//        boolean isRemoved = teamBoardService.removeTeamPost(1, "testuser");
//
//        // 삭제된 엔티티 검증
//        verify(teamBoardRepository, times(1)).delete(teamBoard);
//        assertTrue(isRemoved);
//    }
//
//    /**
//     * getTeamPostDetail 메서드 테스트
//     * <p>
//     * 특정 팀 게시글의 상세 정보를 가져오고, 반환된 정보가 예상과 일치하는지 검증합니다.
//     */
//    @Test
//    void testGetTeamPostDetail() {
//        // Mock 설정
//        when(teamBoardRepository.findById(anyInt())).thenReturn(Optional.of(teamBoard));
//
//        // 서비스 메서드 실행
//        TeamPostResponseDto responseDto = teamBoardService.getTeamPostDetail(1);
//
//        // 결과 검증
//        assertNotNull(responseDto);
//        assertEquals("Test Title", responseDto.getTitle());
//        assertEquals("Test Content", responseDto.getContent());
//        assertEquals("testuser", responseDto.getWriter());
//    }
//
//    /**
//     * MemberNotFoundException 예외 테스트
//     * <p>
//     * 존재하지 않는 사용자를 조회할 때 MemberNotFoundException이 발생하는지 검증합니다.
//     */
//    @Test
//    void testMemberNotFoundException() {
//        // Mock 설정
//        when(memberRepository.findByUsername(anyString())).thenReturn(null);
//
//        // 예외 검증
//        assertThrows(MemberNotFoundException.class,
//            () -> teamBoardService.writeTeamPost("unknownuser", 1, new TeamPostRequestDto()));
//    }
//
//    /**
//     * TeamNotFoundException 예외 테스트
//     * <p>
//     * 존재하지 않는 팀을 조회할 때 TeamNotFoundException이 발생하는지 검증합니다.
//     */
//    @Test
//    void testTeamNotFoundException() {
//        // Mock 설정
//        when(memberRepository.findByUsername(anyString())).thenReturn(member);
//        when(teamRepository.findById(anyInt())).thenReturn(Optional.empty());
//
//        // 예외 검증
//        assertThrows(TeamNotFoundException.class,
//            () -> teamBoardService.writeTeamPost("testuser", 1, new TeamPostRequestDto()));
//    }
//
//    /**
//     * TeamBoardNotFoundException 예외 테스트
//     * <p>
//     * 존재하지 않는 팀 게시글을 조회할 때 TeamBoardNotFoundException이 발생하는지 검증합니다.
//     */
//    @Test
//    void testTeamBoardNotFoundException() {
//        // Mock 설정
//        when(teamBoardRepository.findById(anyInt())).thenReturn(Optional.empty());
//
//        // 예외 검증
//        assertThrows(TeamBoardNotFoundException.class, () -> teamBoardService.getTeamPostDetail(1));
//    }
//
//    /**
//     * MemberNotEqualException 예외 테스트
//     * <p>
//     * 게시글 작성자와 요청 사용자가 일치하지 않을 때 MemberNotEqualException이 발생하는지 검증합니다.
//     */
//    @Test
//    void testMemberNotEqualException() {
//        // Mock 설정
//        Member anotherMember = Member.builder().username("anotheruser").build();
//        when(memberRepository.findByUsername(anyString())).thenReturn(anotherMember);
//        when(teamBoardRepository.findById(anyInt())).thenReturn(Optional.of(teamBoard));
//
//        // 예외 검증
//        assertThrows(MemberNotEqualException.class,
//            () -> teamBoardService.modifyTeamPost("anotheruser", 1, new TeamPostRequestDto()));
//    }
//}
