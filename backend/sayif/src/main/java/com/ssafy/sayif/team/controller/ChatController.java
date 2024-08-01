package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.dto.GetChatResponseDto;
import com.ssafy.sayif.team.dto.PostChatRequestDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamMsg;
import com.ssafy.sayif.team.repository.TeamMsgRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MemberRepository memberRepository;
    private final TeamMsgRepository teamMsgRepository;
    private final TeamRepository teamRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final JWTUtil jwtUtil;
    private static final Map<String, String> sessions = new HashMap<>(); // ID 대신 이름을 저장하기 위해 Map으로 변경

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String username = accessor.getFirstNativeHeader("User"); // FilterChannelInterceptor에서 추가한 User 헤더

        if (username != null) {
            sessions.put(sessionId, username);
        }
    }

    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        sessions.remove(event.getSessionId());
    }

    @Transactional
    @MessageMapping("/team/{teamId}/chat")
    public void sendMessage(@DestinationVariable("teamId") Integer teamId,
                            @Payload PostChatRequestDto chatRequestDto,
                            SimpMessageHeaderAccessor accessor) {
        String username = sessions.get(accessor.getSessionId());
        Member currentUser = memberRepository.findByUsername(username);

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
                chatResponseDto.setUsername(msg.getMember().getId());
                chatResponseDto.setMsgContent(msg.getMsgContent());
                chatResponseDto.setSendAt(msg.getSendAt());
                return chatResponseDto;
            })
            .collect(Collectors.toList());
    }
}