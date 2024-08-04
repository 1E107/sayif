package com.ssafy.sayif.openvidu.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.openvidu.service.OpenViduService;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/openvidu")
public class OpenViduController {
    private final OpenViduService openViduService;
    private final JWTUtil jwtUtil;
    /**
     * @param params The Session properties
     * @return The Session ID
     * OpenVidu 서버에서 세션을 초기화합니다.
     * 이것은 OpenVidu 워크플로우에서 수행해야 할 첫 번째 작업입니다.
     * 이후에 이 세션에 대해 Connection 객체를 생성하고 클라이언트 측에 전달할 수 있는 토큰을 생성할 수 있습니다.
     * 클라이언트는 이 토큰을 사용하여 세션에 연결할 수 있습니다.
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<?> initializeSession(@RequestHeader("Authorization") String authorizationHeader, @RequestBody(required = false) Map<String, Object> params) {
        try {
            log.info("Controller - initialize session");
            Session session = openViduService.createSession(params, "bhe0323");
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create session", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param sessionId Connection을 생성할 session ID
     * @param params    The Connection properties
     * @return Connection에 연결된 token
     * 세션에서 새로운 Connection을 생성합니다.
     */
    @PostMapping("/api/sessions/{sessionId}/connection")
    public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params) {
        try {
            String token = openViduService.createConnection(sessionId, params);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create connection", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * @param sessionId 종료할 session ID
     * @return ResponseEntity with status code
     * OpenVidu 서버에서 세션을 종료합니다.
     * 이 작업은 세션을 닫고, 세션에 연결된 모든 Connection을 종료합니다.
     */
    @DeleteMapping("/api/sessions/{sessionId}")
    public ResponseEntity<?> closeSession(@PathVariable String sessionId) {
        try {
            return new ResponseEntity<>(openViduService.closeSession(sessionId, "bhe0323"), HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to close session", HttpStatus.NOT_FOUND);
        }
    }
}
