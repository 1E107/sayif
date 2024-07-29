package com.ssafy.sayif.openvidu.service;

import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.repository.TeamRepository;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class OpenViduService {
    @Value("${openvidu.url}")
    private String openviduUrl;

    @Value("${openvidu.secret}")
    private String secret;

    private OpenVidu openvidu;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(openviduUrl, secret);
    }

    @Transactional
    public String createSession(Map<String, Object> params, String username) {
            SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = null;
        try {
            session = openvidu.createSession(properties);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }

        // Member에서 username의 Team 가져오기
        // Team에서 team_id의 session_id 업데이트
//        Team team = memberRepository.findByUsername(username).getTeam();
//        team.setSessionId(session.getSessionId());
//        teamRepository.save(team);

        return session.getSessionId();

    }

    public String createConnection(String sessionId, Map<String, Object> params) {
            Session session = openvidu.getActiveSession(sessionId);
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = null;
        try {
            connection = session.createConnection(properties);
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
//        team.setSessionId(null);
//        teamRepository.save(team);

        return "Session closed successfully";
    }

}
