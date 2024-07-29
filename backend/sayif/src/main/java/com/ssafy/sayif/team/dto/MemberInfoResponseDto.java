package com.ssafy.sayif.team.dto;

import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.team.entity.Team;
import lombok.*;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoResponseDto {

    private int id;
    private String username;
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private String gender;
    private String profileImg;
    private Role role;

}
