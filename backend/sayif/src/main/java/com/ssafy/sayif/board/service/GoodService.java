package com.ssafy.sayif.board.service;

import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.Good;
import com.ssafy.sayif.board.exception.BoardNotFoundException;
import com.ssafy.sayif.board.repository.BoardRepository;
import com.ssafy.sayif.board.repository.GoodRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.exception.MemberNotFoundException;
import com.ssafy.sayif.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Good 엔티티를 관리하는 서비스 클래스입니다.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class GoodService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final GoodRepository goodRepository;

    /**
     * ID로 Board를 찾습니다.
     *
     * @param boardId 찾고자 하는 게시판의 ID
     * @return 찾은 Board 엔티티
     * @throws BoardNotFoundException 주어진 ID로 게시판을 찾을 수 없는 경우
     */
    private Board findBoardById(int boardId) {
        return boardRepository.findById(boardId)
            .orElseThrow(() -> new BoardNotFoundException(boardId));
    }

    /**
     * 사용자명으로 Member를 찾습니다.
     *
     * @param username 찾고자 하는 사용자의 사용자명
     * @return 찾은 Member 엔티티
     * @throws MemberNotFoundException 주어진 사용자명으로 사용자를 찾을 수 없는 경우
     */
    private Member findMemberByUsername(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException(username);
        }
        return member;
    }

    /**
     * 주어진 게시판의 좋아요 개수를 반환합니다.
     *
     * @param boardId 게시판의 ID
     * @return 좋아요 개수
     * @throws BoardNotFoundException 주어진 ID로 게시판을 찾을 수 없는 경우
     */
    public int getGoodCountByBoardId(int boardId) {
        Board board = findBoardById(boardId);
        return goodRepository.findAllByBoard(board).size();
    }

    /**
     * 주어진 게시판에 사용자가 좋아요를 추가합니다.
     *
     * @param boardId  게시판의 ID
     * @param username 사용자의 사용자명
     * @return 좋아요가 추가되면 true, 이미 존재하면 false
     * @throws BoardNotFoundException  주어진 ID로 게시판을 찾을 수 없는 경우
     * @throws MemberNotFoundException 주어진 사용자명으로 사용자를 찾을 수 없는 경우
     */
    public boolean pushGood(int boardId, String username) {
        Board board = findBoardById(boardId);
        Member member = findMemberByUsername(username);

        if (goodRepository.findByBoardAndMember(board, member).isPresent()) {
            return false;
        }

        goodRepository.save(Good.builder()
            .member(member)
            .board(board)
            .build());
        return true;
    }

    /**
     * 주어진 게시판에서 사용자의 좋아요를 제거합니다.
     *
     * @param boardId  게시판의 ID
     * @param username 사용자의 사용자명
     * @return 좋아요가 제거되면 true, 이미 존재하지 않으면 false
     * @throws BoardNotFoundException  주어진 ID로 게시판을 찾을 수 없는 경우
     * @throws MemberNotFoundException 주어진 사용자명으로 사용자를 찾을 수 없는 경우
     */
    public boolean removeGood(int boardId, String username) {
        Board board = findBoardById(boardId);
        Member member = findMemberByUsername(username);

        Optional<Good> existingGood = goodRepository.findByBoardAndMember(board, member);
        existingGood.ifPresent(goodRepository::delete);

        return existingGood.isPresent();
    }
}
