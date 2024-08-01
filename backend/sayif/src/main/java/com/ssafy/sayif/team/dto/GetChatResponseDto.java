package com.ssafy.sayif.team.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GetChatResponseDto {

    private String username;
    private String msgContent;
    private LocalDateTime sendAt;
}
