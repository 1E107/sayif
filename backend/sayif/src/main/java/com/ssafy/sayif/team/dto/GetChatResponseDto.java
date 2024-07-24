package com.ssafy.sayif.team.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class GetChatResponseDto {
    private Integer memberId;
    private String msgContent;
    private LocalDateTime sendAt;
}
