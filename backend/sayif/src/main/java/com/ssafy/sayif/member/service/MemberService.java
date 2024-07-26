package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import java.util.List;

public interface MemberService {

    MemberInfoResponseDto getMemberInfo(String username);

    Boolean registerMember(RegisterRequestDto registerRequestDto);

    void updateMemberInfo(String username, MemberUpdateRequestDto updateRequestDto);

    void deleteMember(String username);

    void deleteRefreshTokens(String username);

    List<MentoringRecordResponseDto> getMentoringRecords(String username);

    boolean isMemberExists(String username);

    boolean updatePassword(String username, String newPwd, String newPwdCheck);
}
