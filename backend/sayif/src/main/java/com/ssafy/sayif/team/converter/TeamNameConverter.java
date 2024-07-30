package com.ssafy.sayif.team.converter;

import com.ssafy.sayif.team.dto.TeamNameResponseDto;
import com.ssafy.sayif.team.entity.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamNameConverter {

    public TeamNameResponseDto convertToDto(Team team) {
        return new TeamNameResponseDto(team.getName());
    }
}
