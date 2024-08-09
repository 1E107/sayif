package com.ssafy.sayif.member.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LetterResponseDto {

    private int id;
    private String title;
    private String content;
    private String sendId;
    private int sendMemberId;
    private String receiveMemberNickname;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
