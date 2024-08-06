package com.ssafy.sayif.challenge.Repository;

import com.ssafy.sayif.challenge.entity.ChallengeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeDetailRepository extends JpaRepository<ChallengeDetail, Long> {
    List<ChallengeDetail> findByChallengeId(Long challengeId);
}
