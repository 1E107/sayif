package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Boolean existsByUsername(String username);

    Member findByUsername(String username);

    @Query("SELECT m.nickname FROM Member m WHERE m.team.id = :teamId AND m.role = :role")
    List<String> findMentorNicknamesByTeamId(@Param("teamId") int teamId, @Param("role") Role role);

    @Query("SELECT COUNT(m) FROM Member m WHERE m.team.id = :teamId AND m.role = :role")
    int countMenteesByTeamId(@Param("teamId") int teamId, @Param("role") Role role);

    @Transactional
    @Modifying
    @Query("UPDATE Member m SET m.team.id = :teamId WHERE m.username = :userId OR m.username = :pairId")
    int updateTeamIdForUserIdOrPairId(@Param("teamId") Integer teamId,
        @Param("userId") String userId, @Param("pairId") String pairId);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.team.id = :newTeamId WHERE m.username = :username AND m.role = :role")
    int updateMemberTeam(@Param("username") String username, @Param("role") Role role,
        @Param("newTeamId") int newTeamId);

    List<Member> findByTeamId(Integer teamId);
}
