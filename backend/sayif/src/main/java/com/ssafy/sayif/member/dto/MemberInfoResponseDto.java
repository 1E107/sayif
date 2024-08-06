package com.ssafy.sayif.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponseDto {

    private String username;
    private String name;
    private String nickname;
    private String gender;
    private String phone;
    private String email;
    private String profileImg;
    private String imgUrl;
    private String role;
    private Integer teamId;
}
