package com.ssafy.sayif.openvidu.controller;

import com.ssafy.sayif.openvidu.service.OpenViduService;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/openvidu")
public class OpenViduController {
    private final OpenViduService openViduService;

    /**
     * @param params The Session properties
     * @return The Session ID
     * Initialize a Session in OpenVidu Server.
     * This is the very first operation to perform in OpenVidu workflow.
     * After that, Connection objects can be generated for this Session and their token passed to the client-side,
     * so clients can use it to connect to the Session.
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params) {
        try {
            String sessionId = openViduService.createSession(params);
            return new ResponseEntity<>(sessionId, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create session", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params) {
        String token = openViduService.createConnection(sessionId, params);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @DeleteMapping("/api/sessions/{sessionId}")
    public String closeSession(@PathVariable String sessionId) {
        try {
            return openViduService.closeSession(sessionId);
        } catch (Exception e) {
            return "Error: Failed to close session";
        }
    }
}
