package com.ssafy.sayif.board.repository;

import com.ssafy.sayif.board.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findAllByBoardId(int boardId);
}
