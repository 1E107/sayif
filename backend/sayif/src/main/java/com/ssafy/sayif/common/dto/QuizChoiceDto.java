package com.ssafy.sayif.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizChoiceDto {

    private Integer id;

    private String content;

    private Boolean isAnswer;

}
