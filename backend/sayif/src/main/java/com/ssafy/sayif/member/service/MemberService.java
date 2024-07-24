package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;

public interface MemberService {
    MemberInfoResponseDto getMemberInfo(String memberId);
    Boolean registerMember(RegisterRequestDto registerRequestDto);
}
