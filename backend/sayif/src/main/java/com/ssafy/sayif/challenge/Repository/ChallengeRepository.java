package com.ssafy.sayif.challenge.Repository;

import com.ssafy.sayif.challenge.entity.Challenge;
import com.ssafy.sayif.challenge.entity.ChallengeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByTeamIdAndStatus(int teamId, ChallengeStatus status);
    List<Challenge> findByTeamId(int teamId);
}
