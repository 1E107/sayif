package com.ssafy.sayif.team.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MentoringSearchResponse {

    private int id;
    private String mentor1Nickname;
    private String mentor2Nickname;
    private String startDate;
    private String endDate;
    private String dayOfWeek;
    private String time;
    private String pmam;
    private int menteeCnt;

    private String mentor1ProfileUrl;
    private String mentor2ProfileUrl;
}
