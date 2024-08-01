//package com.ssafy.sayif.board.service;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertFalse;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.Mockito.any;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import com.ssafy.sayif.board.entity.Board;
//import com.ssafy.sayif.board.entity.Good;
//import com.ssafy.sayif.board.exception.BoardNotFoundException;
//import com.ssafy.sayif.board.repository.BoardRepository;
//import com.ssafy.sayif.board.repository.GoodRepository;
//import com.ssafy.sayif.member.entity.Member;
//import com.ssafy.sayif.member.exception.MemberNotFoundException;
//import com.ssafy.sayif.member.repository.MemberRepository;
//import java.util.Optional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//public class GoodServiceTest {
//
//    @Autowired
//    private GoodService goodService;
//
//    @MockBean
//    private BoardRepository boardRepository;
//
//    @MockBean
//    private MemberRepository memberRepository;
//
//    @MockBean
//    private GoodRepository goodRepository;
//
//    private Board board;
//    private Member member;
//
//    @BeforeEach
//    void setUp() {
//        board = Board.builder().id(1).build();
//        member = Member.builder()
//                .id(1)
//                .username("testuser")
//                .build();
//    }
//
//    /**
//     * 게시판을 찾을 수 없는 경우 예외가 발생하는지 테스트합니다.
//     */
//    @Test
//    void testGetGoodCountByBoardId_BoardNotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.empty());
//
//        assertThrows(BoardNotFoundException.class, () -> goodService.getGoodCountByBoardId(1));
//
//        verify(boardRepository, times(1)).findById(1);
//    }
//
//    /**
//     * 좋아요 개수를 성공적으로 반환하는지 테스트합니다.
//     */
//    @Test
//    void testGetGoodCountByBoardId_Success() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(goodRepository.findAllByBoard(board)).thenReturn(java.util.Collections.emptyList());
//
//        int count = goodService.getGoodCountByBoardId(1);
//
//        assertEquals(0, count);
//        verify(boardRepository, times(1)).findById(1);
//        verify(goodRepository, times(1)).findAllByBoard(board);
//    }
//
//    /**
//     * 게시판을 찾을 수 없는 경우 예외가 발생하는지 테스트합니다.
//     */
//    @Test
//    void testPushGood_BoardNotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.empty());
//
//        assertThrows(BoardNotFoundException.class, () -> goodService.pushGood(1, "testuser"));
//
//        verify(boardRepository, times(1)).findById(1);
//    }
//
//    /**
//     * 사용자를 찾을 수 없는 경우 예외가 발생하는지 테스트합니다.
//     */
//    @Test
//    void testPushGood_MemberNotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(memberRepository.findByUsername("testuser")).thenReturn(null);
//
//        assertThrows(MemberNotFoundException.class, () -> goodService.pushGood(1, "testuser"));
//
//        verify(boardRepository, times(1)).findById(1);
//        verify(memberRepository, times(1)).findByUsername("testuser");
//    }
//
//    /**
//     * 좋아요를 성공적으로 추가하는지 테스트합니다.
//     */
//    @Test
//    void testPushGood_Success() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(memberRepository.findByUsername("testuser")).thenReturn(member);
//        when(goodRepository.findByBoardAndMember(board, member)).thenReturn(Optional.empty());
//
//        boolean result = goodService.pushGood(1, "testuser");
//
//        assertTrue(result);
//        verify(boardRepository, times(1)).findById(1);
//        verify(memberRepository, times(1)).findByUsername("testuser");
//        verify(goodRepository, times(1)).findByBoardAndMember(board, member);
//        verify(goodRepository, times(1)).save(any(Good.class));
//    }
//
//    /**
//     * 게시판을 찾을 수 없는 경우 예외가 발생하는지 테스트합니다.
//     */
//    @Test
//    void testRemoveGood_BoardNotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.empty());
//
//        assertThrows(BoardNotFoundException.class, () -> goodService.removeGood(1, "testuser"));
//
//        verify(boardRepository, times(1)).findById(1);
//    }
//
//    /**
//     * 사용자를 찾을 수 없는 경우 예외가 발생하는지 테스트합니다.
//     */
//    @Test
//    void testRemoveGood_MemberNotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(memberRepository.findByUsername("testuser")).thenReturn(null);
//
//        assertThrows(MemberNotFoundException.class, () -> goodService.removeGood(1, "testuser"));
//
//        verify(boardRepository, times(1)).findById(1);
//        verify(memberRepository, times(1)).findByUsername("testuser");
//    }
//
//    /**
//     * 좋아요를 성공적으로 제거하는지 테스트합니다.
//     */
//    @Test
//    void testRemoveGood_Success() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(memberRepository.findByUsername("testuser")).thenReturn(member);
//        Good good = new Good();
//        when(goodRepository.findByBoardAndMember(board, member)).thenReturn(Optional.of(good));
//
//        boolean result = goodService.removeGood(1, "testuser");
//
//        assertTrue(result);
//        verify(boardRepository, times(1)).findById(1);
//        verify(memberRepository, times(1)).findByUsername("testuser");
//        verify(goodRepository, times(1)).findByBoardAndMember(board, member);
//        verify(goodRepository, times(1)).delete(good);
//    }
//
//    /**
//     * 제거할 좋아요가 없는 경우를 테스트합니다.
//     */
//    @Test
//    void testRemoveGood_NotFound() {
//        when(boardRepository.findById(1)).thenReturn(Optional.of(board));
//        when(memberRepository.findByUsername("testuser")).thenReturn(member);
//        when(goodRepository.findByBoardAndMember(board, member)).thenReturn(Optional.empty());
//
//        boolean result = goodService.removeGood(1, "testuser");
//
//        assertFalse(result);
//        verify(boardRepository, times(1)).findById(1);
//        verify(memberRepository, times(1)).findByUsername("testuser");
//        verify(goodRepository, times(1)).findByBoardAndMember(board, member);
//    }
//}
