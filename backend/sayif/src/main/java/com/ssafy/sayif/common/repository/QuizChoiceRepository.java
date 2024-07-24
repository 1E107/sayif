package com.ssafy.sayif.common.repository;

import com.ssafy.sayif.common.entity.Quiz;
import com.ssafy.sayif.common.entity.QuizChoice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizChoiceRepository extends JpaRepository<QuizChoice, Integer> {

    List<QuizChoice> findAllByQuiz(Quiz Quiz);

}
