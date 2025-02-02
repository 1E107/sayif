package com.ssafy.sayif.openvidu.controller;

import com.ssafy.sayif.member.jwt.JWTUtil;
import com.ssafy.sayif.openvidu.service.OpenViduService;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/openvidu")
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
    public ResponseEntity<?> initializeSession(@AuthenticationPrincipal UserDetails userDetails, @RequestBody(required = false)Map<String, Object> params) {
        try {
            log.info("Controller - initialize session");
            String username = userDetails.getUsername();
            Session session = openViduService.createSession(params, username);
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Unexpected error: ", e);
            return new ResponseEntity<>("Unexpected error occurred", HttpStatus.BAD_REQUEST);
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
            String modifiedToken = token.replace("ws://localhost:4443", "ws://i11e107.p.ssafy.io/openvidu");
            log.info(modifiedToken);
            return new ResponseEntity<>(modifiedToken, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Unexpected connection error: ", e);
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
    public ResponseEntity<?> closeSession(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String sessionId) {
        try {
            String username = userDetails.getUsername();
            return new ResponseEntity<>(openViduService.closeSession(sessionId, username), HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to close session", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/sessions/{sessionId}/connection/{connectionId}")
    public ResponseEntity<?> deleteConnection(@PathVariable String sessionId, @PathVariable String connectionId) {
        try{
            return new ResponseEntity<>(openViduService.deleteConnection(sessionId, connectionId), HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>("Failed to delete connection", HttpStatus.NOT_FOUND);
        }
    }

}
