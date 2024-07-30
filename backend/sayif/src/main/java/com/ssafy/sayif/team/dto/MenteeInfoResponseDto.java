package com.ssafy.sayif.team.dto;

import com.ssafy.sayif.member.entity.Status;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MenteeInfoResponseDto extends MemberInfoResponseDto {
    private LocalDateTime applyDate;
    private Status status;
    private String authFile;

}