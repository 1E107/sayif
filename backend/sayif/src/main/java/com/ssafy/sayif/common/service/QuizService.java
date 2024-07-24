package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.dto.QuizChoiceDto;
import com.ssafy.sayif.common.entity.Quiz;
import com.ssafy.sayif.common.repository.QuizChoiceRepository;
import com.ssafy.sayif.common.repository.QuizRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizChoiceRepository quizChoiceRepository;

    public List<Quiz> getQuizzesByChapter(int chapterNum) {
        return quizRepository.findAllByChapter(chapterNum);
    }

    public List<QuizChoiceDto> getQuizChoices(int quizId) {
        Quiz quiz = quizRepository.findById(quizId).get();
        return quizChoiceRepository.findAllByQuiz(quiz).stream()
            .map(quizChoice -> QuizChoiceDto.builder()
                .id(quizChoice.getId()).content(quizChoice.getContent())
                .isAnswer(quizChoice.getIsAnswer()).build()).collect(Collectors.toList());
    }

}
