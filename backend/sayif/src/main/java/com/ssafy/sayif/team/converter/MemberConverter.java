package com.ssafy.sayif.team.converter;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentee;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Tag;
import com.ssafy.sayif.team.dto.MemberInfoResponseDto;
import com.ssafy.sayif.team.dto.MenteeInfoResponseDto;
import com.ssafy.sayif.team.dto.MentorInfoResponseDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberConverter {

    public MemberInfoResponseDto convertToDTO(Member member) {
        if (member instanceof Mentee mentee) {
            MenteeInfoResponseDto dto = new MenteeInfoResponseDto();
            dto.setApplyDate(mentee.getApplyDate());
            dto.setStatus(mentee.getStatus());
            dto.setAuthFile(mentee.getAuthFile());
            setCommonFields(dto, member);
            return dto;
        } else if (member instanceof Mentor mentor) {
            MentorInfoResponseDto dto = new MentorInfoResponseDto();
            dto.setMajor(mentor.getMajor());
            dto.setRegCode(mentor.getRegCode());
            dto.setSeq(mentor.getSeq());
            dto.setIntro(mentor.getIntro());
            dto.setTrack(mentor.getTrack());
            List<String> tags = new ArrayList<>();
            for (Tag tag : mentor.getTags()) {
                if (!tag.isRemove()) {  // isRemove가 false인 태그만 추가
                    tags.add(tag.getContent());
                }
            }
            dto.setTags(tags);
            setCommonFields(dto, member);
            return dto;
        } else {
            throw new IllegalArgumentException("Unknown member type");
        }
    }

    private void setCommonFields(MemberInfoResponseDto dto, Member member) {
        dto.setId(member.getId());
        dto.setUsername(member.getUsername());
        dto.setPassword(member.getPassword());
        dto.setName(member.getName());
        dto.setNickname(member.getNickname());
        dto.setEmail(member.getEmail());
        dto.setPhone(member.getPhone());
        dto.setGender(member.getGender());
        dto.setProfileImg(member.getProfileImg());
        dto.setRole(member.getRole());
    }
}
