package com.ssafy.sayif.openvidu.service;

import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.repository.TeamRepository;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenViduService {
    @Value("${openvidu.url}")
    private String openviduUrl;

    @Value("${openvidu.secret}")
    private String secret;

    private OpenVidu openvidu;

    private final MemberRepository memberRepository;

    private final TeamRepository teamRepository;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(openviduUrl, secret);
    }

    @Transactional
    public Session createSession(Map<String, Object> params, String username) {
        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = null;
        log.info("Service - createSession 입장");
        try {
            session = openvidu.createSession(properties);
            // Member에서 username의 Team 가져오기
            // Team에서 team_id의 session_id 업데이트
//            Team team = memberRepository.findByUsername(username).getTeam();
//            log.info(username + "'s team id: " + team.getId());
//            team.updateSessionId(session.getSessionId());
//            log.info(team.toString());
//            teamRepository.save(team);
            log.info(session.getSessionId());
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
        return session;
    }

    public String createConnection(String sessionId, Map<String, Object> params) {
            Session session = openvidu.getActiveSession(sessionId);
        ConnectionProperties properties = new ConnectionProperties.Builder().build();
//        params.put("token", openviduUrl);
//        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = null;
        try {
            connection = session.createConnection(properties);
            log.info(connection.getToken());
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
        return connection.getToken();

    }

    @Transactional
    public String closeSession(String sessionId, String username) {
        Session session = openvidu.getActiveSession(sessionId);
        try {
            session.close();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }

        // 회의 열었던 멘토가 종료하면 그 사람 팀 세션 id 없애기
//        Team team = memberRepository.findByUsername(username).getTeam();
//        team.updateSessionId(null);
//        teamRepository.save(team);

        return "Session closed successfully";
    }

}
