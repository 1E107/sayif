package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.dto.QuizChoiceResponseDto;
import com.ssafy.sayif.common.entity.Quiz;
import com.ssafy.sayif.common.service.QuizService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/team/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/{chapter}")
    public List<Quiz> getQuizzesByChapter(@PathVariable("chapter") int chapterNum) {
        return quizService.getQuizzesByChapter(chapterNum);
    }

    @GetMapping("/{chapter}/{quizId}")
    public List<QuizChoiceResponseDto> getQuizChoices(@PathVariable("quizId") int quizId) {
        return quizService.getQuizChoices(quizId);
    }
}
