package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.dto.QuizResponseDto;
import com.ssafy.sayif.common.service.QuizService;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final MemberRepository memberRepository;

    @GetMapping("/{chapter}")
    public List<QuizResponseDto> getQuizzesByChapter(@PathVariable("chapter") int chapterNum) {
        return quizService.getQuizzesByChapter(chapterNum).stream()
            .map(quiz -> QuizResponseDto.builder()
                .id(quiz.getId())
                .question(quiz.getQuestion())
                .quizChoiceDto(quizService.getQuizChoices(quiz.getId())).build())
            .collect(Collectors.toList());
    }

    @GetMapping("/solve/{id}")
    public ResponseEntity<Boolean> solveQuiz(@PathVariable("id") int quizId, @AuthenticationPrincipal UserDetails userDetails) {
        Member member = memberRepository.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(quizService.isQuizSolved(quizId, member.getId()));
    }


    @PostMapping("/solve/{id}")
    public ResponseEntity<String> saveQuiz(
            @PathVariable("id") int quizId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        quizService.saveQuizMember(quizId, username);
        return ResponseEntity.ok("Quiz solved and saved successfully.");
    }

}
