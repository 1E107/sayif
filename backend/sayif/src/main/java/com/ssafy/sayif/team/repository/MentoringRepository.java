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

    @Query("SELECT t FROM Team t WHERE t.startDate >= :startDateFrom AND t.startDate < :startDateTo AND t.mentoringTime = :mentoringTime")
    Page<Team> findTeamsByStartDateBetweenAndMentoringTime(
            @Param("startDateFrom") LocalDate startDateFrom,
            @Param("startDateTo") LocalDate startDateTo,
            @Param("mentoringTime") LocalTime mentoringTime,
            Pageable pageable
    );

    // 이거 나중에 UserRepository에 추가해서 쓰면됨
//    @Query("SELECT m.nickname FROM Member m WHERE m.team.id = :teamId AND m.role = 'Mentor'")
//    List<String> findMentorNicknamesByTeamId(@Param("teamId") int teamId);

//    @Query("SELECT COUNT(m) FROM Member m WHERE m.team.id = :teamId AND m.role = 'Mentee'")
//    long countMenteesByTeamId(@Param("teamId") int teamId);

//    @Transactional
//    @Modifying
//    @Query("UPDATE Member m SET m.team.id = :teamId WHERE m.id = :userId OR m.id = :pairId")
//    int updateTeamIdForUserIdOrPairId(@Param("teamId") Long teamId, @Param("userId") String userId, @Param("pairId") String pairId);
}
