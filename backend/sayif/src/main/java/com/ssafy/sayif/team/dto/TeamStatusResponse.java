package com.ssafy.sayif.team.dto;

import com.ssafy.sayif.team.entity.TeamStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamStatusResponse {
    private TeamStatus status;
}
