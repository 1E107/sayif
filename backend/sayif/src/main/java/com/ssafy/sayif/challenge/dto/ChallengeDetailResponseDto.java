package com.ssafy.sayif.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDetailResponseDto {
    private Long challengeId;
    private String fileUrl;
    private String memberNickname;
    private LocalDateTime createdAt;
}
