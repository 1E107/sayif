package com.ssafy.sayif.challenge.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final WebClient.Builder webClientBuilder;

    private static final String FASTAPI_URL = "http://127.0.0.1:8000/predict/";

    public Mono<String> getPrediction(MultipartFile file) {
        WebClient webClient = webClientBuilder.build();
        return webClient.post()
                .uri(FASTAPI_URL)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("file", file.getResource()))
                .retrieve()
                .bodyToMono(String.class);
    }
}
