package com.ssafy.sayif.challenge.dto;

import com.ssafy.sayif.challenge.entity.ChallengeList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResponseDto {

    private Long challengeId;
    private ChallengeList challengeList;
}
