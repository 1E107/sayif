package com.ssafy.sayif.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.sayif.team.entity.TeamMsg;
import java.util.List;

public interface TeamMsgRepository extends JpaRepository<TeamMsg, Long> {
    List<TeamMsg> findByTeamIdOrderBySendAtAsc(Integer teamId);
}