package com.ssafy.sayif.openvidu.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
public class OpenViduService {
    @Value("${openvidu.url}")
    private String openviduUrl;

    @Value("${openvidu.secret}")
    private String secret;

    private RestTemplate restTemplate = new RestTemplate();
    private HttpHeaders createHeaders() {
        return new HttpHeaders() {{
            String auth = "OPENVIDUAPP:" + secret;
            byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
            String authHeader = "Basic " + new String(encodedAuth);
            set("Authorization", authHeader);
            set("Content-Type", "application/json");
        }};
    }

    public String createSession() {
        String url = openviduUrl + "/openvidu/api/sessions";
        HttpEntity<String> entity = new HttpEntity<>("{}", createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        return parseResponse(response, "id");
    }

    public String createToken(String sessionId) {
        String url = openviduUrl + "/openvidu/api/sessions/" + sessionId + "/connection";
        HttpEntity<String> entity = new HttpEntity<>("{}", createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        return parseResponse(response, "token");
    }

    private String parseResponse(ResponseEntity<String> response, String key) {
        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                JSONObject json = new JSONObject(response.getBody());
                return json.getString(key);
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse JSON response", e);
            }
        } else {
            throw new RuntimeException("Failed to create session/token, status code: " + response.getStatusCode());
        }
    }
}
