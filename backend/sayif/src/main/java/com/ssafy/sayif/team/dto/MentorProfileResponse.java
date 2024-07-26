package com.ssafy.sayif.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MentorProfileResponse {
    private int id;
    private String nickname;
    private String name;
    private String email;
    private String major;
    private String track;
    private String profileImg;
    private String intro;
    private int regCode;
    private int seq;
}
