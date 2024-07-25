package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.PostChatRequestDto;
import com.ssafy.sayif.team.dto.GetChatResponseDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamMsg;
import com.ssafy.sayif.team.repository.TeamMsgRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ChatController {

    @Autowired
    private TeamMsgRepository teamMsgRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/team/{teamId}/chat")
    public void sendMessage(@DestinationVariable("teamId") Integer teamId,
                            @Payload PostChatRequestDto chatRequestDto,
                            @AuthenticationPrincipal Member currentUser) {
        // 현재 로그인된 사용자의 정보는 @AuthenticationPrincipal을 통해 자동으로 주입됨

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("해당 팀을 찾을 수 없습니다."));

        if (!currentUser.getTeam().getId().equals(teamId)) {
            throw new RuntimeException("사용자가 속한 팀이 아닙니다.");
        }

        TeamMsg message = TeamMsg.builder()
                .msgContent(chatRequestDto.getMsgContent())
                .member(currentUser)
                .team(team)
                .sendAt(LocalDateTime.now())
                .build();

        teamMsgRepository.save(message);

        messagingTemplate.convertAndSend("/topic/" + teamId, message);
    }

    @GetMapping("/team/{teamId}/chat")
    public List<GetChatResponseDto> getTeamMessages(@PathVariable("teamId") Integer teamId) {
        List<TeamMsg> teamMsgs = teamMsgRepository.findByTeamIdOrderBySendAtAsc(teamId);

        return teamMsgs.stream()
                .map(msg -> {
                    GetChatResponseDto chatResponseDto = new GetChatResponseDto();
                    chatResponseDto.setMemberId(msg.getMember().getId());
                    chatResponseDto.setMsgContent(msg.getMsgContent());
                    chatResponseDto.setSendAt(msg.getSendAt());
                    return chatResponseDto;
                })
                .collect(Collectors.toList());
    }
}