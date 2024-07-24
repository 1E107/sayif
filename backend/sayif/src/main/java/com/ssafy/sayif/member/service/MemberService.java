package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;

public interface MemberService {
    MemberInfoResponseDto getMemberInfo(String memberId);
    Boolean registerMember(RegisterRequestDto registerRequestDto);
    void updateMemberInfo(String memberId, MemberUpdateRequestDto updateRequestDto);

    void deleteMember(String memberId);
    void deleteRefreshTokens(String memberId);
}
