package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByStatus(TeamStatus status);

    @Query("SELECT t FROM Team t WHERE t.startDate BETWEEN :startDateFrom AND :startDateTo AND t.mentoringTime = :mentoringTime AND t.status = 'Apply'")
    Page<Team> findTeamsByStartDateBetweenAndMentoringTime(
            @Param("startDateFrom") LocalDate startDateFrom,
            @Param("startDateTo") LocalDate startDateTo,
            @Param("mentoringTime") LocalTime mentoringTime,
            Pageable pageable
    );
}
