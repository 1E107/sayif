package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.dto.QuizResponseDto;
import com.ssafy.sayif.common.service.QuizService;
import java.util.List;
import java.util.stream.Collectors;
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
    public List<QuizResponseDto> getQuizzesByChapter(@PathVariable("chapter") int chapterNum) {
        return quizService.getQuizzesByChapter(chapterNum).stream()
            .map(quiz -> QuizResponseDto.builder()
                .id(quiz.getId())
                .question(quiz.getQuestion())
                .quizChoiceDto(quizService.getQuizChoices(quiz.getId())).build())
            .collect(Collectors.toList());
    }
}
