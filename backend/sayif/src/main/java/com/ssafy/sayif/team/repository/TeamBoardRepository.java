package com.ssafy.sayif.team.repository;


import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamBoardRepository extends JpaRepository<TeamBoard, Integer> {

    Page<TeamBoard> findAllByTeamAndContentContainingOrderByCreatedAtDesc(Pageable pageable,
        Team team, String word);

    Page<TeamBoard> findAllByTeamAndTitleContainingOrderByCreatedAtDesc(Pageable pageable,
        Team team, String word);

    Page<TeamBoard> findAllByTeamOrderByCreatedAtDesc(Pageable pageable, Team team);

}
