package com.ssafy.sayif.team.dto;

import lombok.Data;

@Data
public class MentoringInfoResponseDto {

    private int id;
    private String mentor1Nickname;
    private String mentor2Nickname;
    private String startDate;
    private String deadlineDate;
    private int menteeCnt;

    public void increaseMentee() {
        menteeCnt++;
    }
}
