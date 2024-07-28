package com.ssafy.sayif.board.repository;

import com.ssafy.sayif.board.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
