package com.ssafy.sayif.team.converter;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.team.entity.Team;
import org.springframework.stereotype.Component;
import com.ssafy.sayif.team.entity.Story;
import com.ssafy.sayif.team.dto.PostStoryRequestDto;
import com.ssafy.sayif.team.dto.GetStoryResponseDto;

@Component
public class StoryConverter {

    public Story convertToEntity(PostStoryRequestDto dto, Team team, Member member) {
        return Story.builder()
                .content(dto.getContent())
                .team(team)
                .member(member)
                .isRead(false)
                .build();
    }

    public GetStoryResponseDto convertToDto(Story story) {
        return GetStoryResponseDto.builder()
                .contentId(story.getId())
                .content(story.getContent())
                .createAt(story.getCreatedAt())
                .read(story.getIsRead())
                .build();
    }
}
