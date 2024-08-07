package com.ssafy.sayif.common.repository;

import com.ssafy.sayif.common.entity.QuizMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizMemberRepository extends JpaRepository<QuizMember, Long> {
    Optional<QuizMember> findByQuizIdAndMemberId(int quizId, int memberId);
}
