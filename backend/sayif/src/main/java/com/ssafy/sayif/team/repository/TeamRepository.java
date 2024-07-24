package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByStatus(TeamStatus status);
}
