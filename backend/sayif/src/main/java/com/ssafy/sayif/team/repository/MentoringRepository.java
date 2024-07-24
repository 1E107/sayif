package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface MentoringRepository extends JpaRepository<Team, Integer> {

    @Query("SELECT t FROM Team t WHERE t.startDate BETWEEN :startDateFrom AND :startDateTo AND t.mentoringTime = :mentoringTime AND t.status = 'Apply'")
    Page<Team> findTeamsByStartDateBetweenAndMentoringTime(
            @Param("startDateFrom") LocalDate startDateFrom,
            @Param("startDateTo") LocalDate startDateTo,
            @Param("mentoringTime") LocalTime mentoringTime,
            Pageable pageable
    );


}
