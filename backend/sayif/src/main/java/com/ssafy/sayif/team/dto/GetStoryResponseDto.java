package com.ssafy.sayif.team.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStoryResponseDto {

    private Integer contentId;
    private String content;
    private LocalDateTime createAt;
    private Boolean read;

}
