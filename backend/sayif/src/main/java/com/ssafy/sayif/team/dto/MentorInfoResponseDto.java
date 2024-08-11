package com.ssafy.sayif.team.dto;

import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.entity.Tag;
import com.ssafy.sayif.member.entity.Track;
import com.ssafy.sayif.team.entity.Team;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MentorInfoResponseDto extends MemberInfoResponseDto {
    private String major;
    private int regCode;
    private int seq;
    private String intro;
    private Track track;
    private List<String> tags = new ArrayList<>();  // 기본값 설정
}