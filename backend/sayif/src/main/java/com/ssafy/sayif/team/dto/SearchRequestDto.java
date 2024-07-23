package com.ssafy.sayif.team.dto;

import lombok.Data;

@Data
public class SearchRequestDto {
    private String startDateFrom;
    private String startDateTo;
    private String pmam;
    private String time;
}
