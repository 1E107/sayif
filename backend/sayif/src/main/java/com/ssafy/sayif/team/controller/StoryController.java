package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.service.MemberService;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.ssafy.sayif.team.dto.PostStoryRequestDto;
import com.ssafy.sayif.team.dto.GetStoryResponseDto;
import com.ssafy.sayif.team.entity.Story;
import com.ssafy.sayif.team.converter.StoryConverter;
import com.ssafy.sayif.team.service.StoryService;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.member.entity.Member;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/story")
public class StoryController {

    private final StoryService storyService;
    private final StoryConverter storyConverter;
    private final MemberService memberService;
    private final TeamService teamService;
    private final JWTUtil jwtUtil;


    @PostMapping
    public ResponseEntity<GetStoryResponseDto> addStory(@PathVariable Integer teamId,
                                                        @AuthenticationPrincipal UserDetails userDetails,
                                                        @RequestBody PostStoryRequestDto storyDto) {
        String username = userDetails.getUsername();
        Member member = memberService.getMemberByUsername(username);

        Team team = teamService.getTeamName(teamId);

        Story story = storyConverter.convertToEntity(storyDto, team, member);
        Story savedStory = storyService.saveStory(story);

        // 사연 등록 후 방금 저장된 내용 바로 보이게
        GetStoryResponseDto responseDto = storyConverter.convertToDto(savedStory);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }


    @GetMapping
    public ResponseEntity<List<GetStoryResponseDto>> getAllStories(@PathVariable Integer teamId) {
        List<Story> stories = storyService.getAllStoriesByTeamId(teamId);
        List<GetStoryResponseDto> responseDtos = stories.stream()
                .map(storyConverter::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<Void> markStoryAsRead(@PathVariable Integer teamId, @PathVariable Integer contentId) {
        storyService.setStoryAsRead(contentId);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}