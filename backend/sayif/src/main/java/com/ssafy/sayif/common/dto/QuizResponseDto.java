package com.ssafy.sayif.common.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizResponseDto {

    private int id;
    private String question;
    private List<QuizChoiceDto> quizChoiceDto;

}
