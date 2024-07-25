package com.ssafy.sayif.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MentoringRecordResponseDto {
    private String name;
    private String startDate;
    private String endDate;
    private String review;
}
