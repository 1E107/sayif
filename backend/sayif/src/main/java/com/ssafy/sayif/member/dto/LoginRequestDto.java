package com.ssafy.sayif.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private String memberId;
    private String password;
}
