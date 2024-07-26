package com.ssafy.sayif.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LetterResponseDto {
    private int id;
    private String title;
    private String content;
    private String sendId;
    private String receiveId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
