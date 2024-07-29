package com.ssafy.sayif.board.repository;

import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.Good;
import com.ssafy.sayif.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodRepository extends JpaRepository<Good, Integer> {

    List<Good> findAllByBoard(Board board);

    Optional<Good> findByBoardAndMember(Board board, Member member);
}
