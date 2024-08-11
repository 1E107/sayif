package com.ssafy.sayif.board.repository;


import com.ssafy.sayif.board.entity.Board;
import com.ssafy.sayif.board.entity.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    Page<Board> findAllByType(Pageable pageable, BoardType type);

    // 전체 게시글 목록 조회
    Page<Board> findAll(Pageable pageable);
}
