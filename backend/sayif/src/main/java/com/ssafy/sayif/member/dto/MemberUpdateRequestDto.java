package com.ssafy.sayif.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequestDto {

    private String username;
    private String name;
    private String nickname;
    private String gender;
    private String email;
    private String phone;
}
