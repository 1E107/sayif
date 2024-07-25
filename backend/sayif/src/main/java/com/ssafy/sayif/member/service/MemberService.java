package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.History;

import java.util.List;

public interface MemberService {
    MemberInfoResponseDto getMemberInfo(String memberId);
    Boolean registerMember(RegisterRequestDto registerRequestDto);
    void updateMemberInfo(String memberId, MemberUpdateRequestDto updateRequestDto);

    void deleteMember(String memberId);
    void deleteRefreshTokens(String memberId);

    List<MentoringRecordResponseDto> getMentoringRecords(String memberId);

    boolean isMemberExists(String memberId);
    boolean updatePassword(String memberId, String newPwd, String newPwdCheck);
}
