package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentoringRepository extends JpaRepository<Team, Integer> {

}
