package com.ssafy.sayif.common.repository;

import com.ssafy.sayif.common.entity.Quiz;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    List<Quiz> findAllByChapter(Integer chapterNum);

}
