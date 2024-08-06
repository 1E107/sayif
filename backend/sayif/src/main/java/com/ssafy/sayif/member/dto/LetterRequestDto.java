package com.ssafy.sayif.member.dto;

import lombok.Data;

@Data
public class LetterRequestDto {

    private String title;
    private String content;
    private int receiver;
}
