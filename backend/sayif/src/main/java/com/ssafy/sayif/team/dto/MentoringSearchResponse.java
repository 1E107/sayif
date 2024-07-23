package com.ssafy.sayif.team.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MentoringSearchResponse {
    private String mentor1Nickname;
    private String mentor2Nickname;
    private String startDate;
    private String endDate;
    private String dayOfWeek;
    private String time;
    private String pmam;
    private int menteeCnt;
}
