package com.ssafy.sayif.member.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequestDto {

    private String username;
    private String password;
    private String name;
    private String nickname;
    private String gender;
    private String phone;
    private String email;
}
