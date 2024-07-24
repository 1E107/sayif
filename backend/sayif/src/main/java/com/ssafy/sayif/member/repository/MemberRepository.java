package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Boolean existsByMemberId(String memberId);

    Member findByMemberId(String memberId);

    @Query("SELECT m.nickname FROM Member m WHERE m.team.id = :teamId AND m.role = :role")
    List<String> findMentorNicknamesByTeamId(@Param("teamId") int teamId, Role role);

    @Query("SELECT COUNT(m) FROM Member m WHERE m.team.id = :teamId AND m.role = :role")
    int countMenteesByTeamId(@Param("teamId") int teamId, Role role);

    @Transactional
    @Modifying
    @Query("UPDATE Member m SET m.team.id = :teamId WHERE m.memberId = :userId OR m.memberId = :pairId")
    int updateTeamIdForUserIdOrPairId(@Param("teamId") Integer teamId, @Param("userId") String userId, @Param("pairId") String pairId);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.team.id = :newTeamId WHERE m.memberId = :memberId AND m.role = :role")
    int updateMemberTeam(@Param("memberId") String memberId, @Param("role") Role role, @Param("newTeamId") int newTeamId);

}
