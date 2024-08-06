package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.GetChatResponseDto;
import com.ssafy.sayif.team.entity.TeamMsg;
import com.ssafy.sayif.team.repository.TeamMsgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class ChatRestController {

    private final TeamMsgRepository teamMsgRepository;

    @GetMapping("/{teamId}/chat")
    public ResponseEntity<List<GetChatResponseDto>> getTeamMessages(@PathVariable("teamId") Integer teamId) {
        List<TeamMsg> teamMsgs = teamMsgRepository.findByTeamIdOrderBySendAtAsc(teamId);

        List<GetChatResponseDto> chatResponseDtos = teamMsgs.stream()
                .map(msg -> {
                    GetChatResponseDto chatResponseDto = new GetChatResponseDto();
                    chatResponseDto.setNickname(msg.getMember().getNickname());
                    chatResponseDto.setMsgContent(msg.getMsgContent());
                    chatResponseDto.setSendAt(msg.getSendAt());
                    return chatResponseDto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(chatResponseDtos);
    }
}
