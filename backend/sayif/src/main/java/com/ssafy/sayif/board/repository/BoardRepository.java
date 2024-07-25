package com.ssafy.sayif.board.repository;


import com.ssafy.sayif.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {

}
