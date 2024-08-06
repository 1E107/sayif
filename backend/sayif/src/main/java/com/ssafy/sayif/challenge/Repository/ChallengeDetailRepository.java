package com.ssafy.sayif.challenge.Repository;

import com.ssafy.sayif.challenge.entity.ChallengeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeDetailRepository extends JpaRepository<ChallengeDetail, Long> {
    List<ChallengeDetail> findByChallengeId(Long challengeId);
    Optional<ChallengeDetail> findByChallengeIdAndMemberId(Long challengeId, int memberId);
}
