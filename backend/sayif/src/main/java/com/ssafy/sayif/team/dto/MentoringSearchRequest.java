package com.ssafy.sayif.team.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MentoringSearchRequest {

    @JsonProperty("start_date_from")
    private String startDateFrom;
    @JsonProperty("start_date_to")
    private String startDateTo;
    private String pmam;
    private String time;
}
