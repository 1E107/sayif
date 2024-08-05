package com.ssafy.sayif.team.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
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
    private List<String> tags;
}
