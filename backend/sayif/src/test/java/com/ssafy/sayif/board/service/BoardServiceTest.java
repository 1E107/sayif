package com.ssafy.sayif.board.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.sayif.board.dto.BoardResponseDto;
import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.BoardType;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

public class BoardServiceTest {

    @Mock
    private BoardRepository boardRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private GoodService goodService;
    @InjectMocks
    private BoardService boardService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * 게시글 작성 테스트 메서드. 게시글이 올바르게 생성되고 반환된 DTO가 입력값과 일치하는지 검증합니다.
     */
    @Test
    public void testWritePost() {
        WritePostRequestDto dto = new WritePostRequestDto();
        dto.setUsername(1);
        dto.setTitle("Test Title");
        dto.setContent("Test Content");
        dto.setFile("Test File");
        dto.setType(BoardType.Free);

        Member member = new Member();
        member.setId(1);
        member.setName("Test Member");

        Board board = Board.builder()
            .id(1)
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .isRemove(false)
            .member(member)
            .build();

        when(memberRepository.findById(dto.getUsername())).thenReturn(Optional.of(member));
        when(boardRepository.save(any(Board.class))).thenReturn(board);

        Optional<BoardResponseDto> result = boardService.writePost(dto);

        assertTrue(result.isPresent());
        assertEquals(dto.getTitle(), result.get().getTitle());
        assertEquals(dto.getContent(), result.get().getContent());
        assertEquals(dto.getFile(), result.get().getFile());
        assertEquals(member.getName(), result.get().getWriter());
    }

    /**
     * 게시글 수정 테스트 메서드. 게시글이 올바르게 수정되고 반환된 DTO가 수정된 값과 일치하는지 검증합니다.
     */
    @Test
    public void testModifyPost() {
        ModifyPostRequestDto dto = new ModifyPostRequestDto();
        dto.setTitle("Updated Title");
        dto.setContent("Updated Content");
        dto.setFile("Updated File");
        dto.setType(BoardType.Free);

        Member member = new Member();
        member.setId(1);
        member.setName("Test Member");

        Board existingBoard = Board.builder()
            .id(1)
            .file("Old File")
            .title("Old Title")
            .content("Old Content")
            .type(BoardType.Notice)
            .isRemove(false)
            .member(member)
            .createdAt(LocalDateTime.now().minusDays(1))
            .modifiedAt(LocalDateTime.now().minusDays(1))
            .hitCount(0)
            .build();

        Board updatedBoard = Board.builder()
            .id(1)
            .file(dto.getFile())
            .title(dto.getTitle())
            .content(dto.getContent())
            .type(dto.getType())
            .isRemove(false)
            .member(member)
            .createdAt(existingBoard.getCreatedAt())
            .modifiedAt(LocalDateTime.now())
            .hitCount(0)
            .build();

        when(boardRepository.findById(1)).thenReturn(Optional.of(existingBoard));
        when(boardRepository.save(any(Board.class))).thenReturn(updatedBoard);

        Optional<BoardResponseDto> result = boardService.modifyPost(1, dto);

        assertTrue(result.isPresent());
        assertEquals(dto.getTitle(), result.get().getTitle());
        assertEquals(dto.getContent(), result.get().getContent());
        assertEquals(dto.getFile(), result.get().getFile());
    }

    /**
     * 게시글 삭제 테스트 메서드. 게시글이 올바르게 삭제되고 반환된 결과가 true인지 검증합니다.
     */
    @Test
    public void testRemovePost() {
        Member member = new Member();
        member.setId(1);
        member.setName("Test Member");

        Board board = Board.builder()
            .id(1)
            .file("Test File")
            .title("Test Title")
            .content("Test Content")
            .type(BoardType.Free)
            .isRemove(false)
            .member(member)
            .createdAt(LocalDateTime.now().minusDays(1))
            .modifiedAt(LocalDateTime.now().minusDays(1))
            .hitCount(0)
            .build();

        when(boardRepository.findById(1)).thenReturn(Optional.of(board));

        boolean result = boardService.removePost(1);

        assertTrue(result);
        verify(boardRepository, times(1)).save(any(Board.class));
    }

    /**
     * 게시글 목록 조회 테스트 메서드. 게시글 목록이 올바르게 조회되고, 삭제되지 않은 게시글만 반환되는지 검증합니다.
     */
    @Test
    public void testGetPostList() {
        Member member = new Member();
        member.setId(1);
        member.setName("Test Member");

        Board board1 = Board.builder()
            .id(1)
            .file("File 1")
            .title("Title 1")
            .content("Content 1")
            .type(BoardType.Free)
            .isRemove(false)
            .member(member)
            .build();

        Board board2 = Board.builder()
            .id(2)
            .file("File 2")
            .title("Title 2")
            .content("Content 2")
            .type(BoardType.Notice)
            .isRemove(true)
            .member(member)
            .build();

        List<Board> boards = Arrays.asList(board1, board2);
        Page<Board> boardPage = new PageImpl<>(boards);

        when(boardRepository.findAll(any(PageRequest.class))).thenReturn(boardPage);

        List<BoardResponseDto> result = boardService.getPostList(0, 10);

        assertEquals(1, result.size());
        assertEquals("Title 1", result.get(0).getTitle());
    }

    /**
     * 게시글 상세 조회 테스트 메서드. 게시글이 올바르게 조회되고 반환된 DTO가 예상 값과 일치하는지 검증합니다.
     */
    @Test
    public void testGetPostDetail() {
        Member member = new Member();
        member.setId(1);
        member.setName("Test Member");

        Board board = Board.builder()
            .id(1)
            .file("Test File")
            .title("Test Title")
            .content("Test Content")
            .type(BoardType.Free)
            .isRemove(false)
            .member(member)
            .build();

        when(boardRepository.findById(1)).thenReturn(Optional.of(board));

        BoardResponseDto result = boardService.getPostDetail(1);

        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Content", result.getContent());
    }
}
