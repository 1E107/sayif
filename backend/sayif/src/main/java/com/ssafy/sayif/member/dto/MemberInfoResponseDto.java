package com.ssafy.sayif.member.dto;

import com.ssafy.sayif.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponseDto {
    private String memberId;
    private String name;
    private String nickname;
    private String gender;
    private String phone;
    private String email;
    private String profileImg;
    private String role;
    private Integer teamId;
}
