package com.ssafy.sayif.openvidu.service;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
public class OpenViduService {
    @Value("${openvidu.url}")
    private String openviduUrl;

    @Value("${openvidu.secret}")
    private String secret;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(openviduUrl, secret);
    }

    @SneakyThrows
    public String createSession(Map<String, Object> params) {
            SessionProperties properties = SessionProperties.fromJson(params).build();
            Session session = openvidu.createSession(properties);
            return session.getSessionId();

    }

    @SneakyThrows
    public String createConnection(String sessionId, Map<String, Object> params) {
            Session session = openvidu.getActiveSession(sessionId);
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();

    }
    @SneakyThrows
    public String closeSession(String sessionId) {
            Session session = openvidu.getActiveSession(sessionId);
           session.close();
           return "closed";

    }

}
