package com.ssafy.sayif.team.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
@Getter
public class GetChatResponseDto {

    private String username;

    private String msgContent;

    @JsonProperty("sendAt")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime sendAt;
}
