package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.dto.QuizChoiceDto;
import com.ssafy.sayif.common.entity.Quiz;
import com.ssafy.sayif.common.entity.QuizMember;
import com.ssafy.sayif.common.repository.QuizChoiceRepository;
import com.ssafy.sayif.common.repository.QuizMemberRepository;
import com.ssafy.sayif.common.repository.QuizRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizService {

    private final MemberRepository memberRepository;
    private final QuizRepository quizRepository;
    private final QuizChoiceRepository quizChoiceRepository;
    private final QuizMemberRepository quizMemberRepository;

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

    public boolean isQuizSolved(int quizId, int memberId) {
        Optional<QuizMember> quizMember = quizMemberRepository.findByQuizIdAndMemberId(quizId, memberId);
        if (quizMember.isPresent()) {
            return true;
        }
        return false;
    }

    public void saveQuizMember(int quizId, String username) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        Member member = memberRepository.findByUsername(username);

        if (quizOptional.isPresent()) {
            QuizMember quizMember = QuizMember.builder()
                    .quiz(quizOptional.get())
                    .member(member)
                    .build();
            quizMemberRepository.save(quizMember);
        } else {
            throw new IllegalArgumentException("Quiz not found");
        }
    }
}
