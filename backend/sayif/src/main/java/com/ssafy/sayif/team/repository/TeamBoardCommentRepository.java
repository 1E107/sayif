package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.QnaAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamBoardCommentRepository extends JpaRepository<QnaAnswer, Integer> {

}
