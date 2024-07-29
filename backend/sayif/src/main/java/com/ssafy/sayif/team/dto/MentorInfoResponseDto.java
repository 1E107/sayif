package com.ssafy.sayif.team.dto;

import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.entity.Track;
import com.ssafy.sayif.team.entity.Team;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MentorInfoResponseDto extends MemberInfoResponseDto {
    private String major;
    private int regCode;
    private int seq;
    private String intro;
    private Track track;
}