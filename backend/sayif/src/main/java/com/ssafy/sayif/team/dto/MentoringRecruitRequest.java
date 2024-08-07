package com.ssafy.sayif.team.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MentoringRecruitRequest {

    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("day_of_week")
    private String dayOfWeek;
    private String time;
    private String pmam;
    private String id;
}
