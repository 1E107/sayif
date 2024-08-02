package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.QnaAnswer;
import com.ssafy.sayif.team.entity.TeamBoard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamBoardCommentRepository extends JpaRepository<QnaAnswer, Integer> {

    List<QnaAnswer> getAllByTeamBoard(TeamBoard teamBoard);

}
