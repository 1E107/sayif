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

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final WebClient.Builder webClientBuilder;

    private static final String FASTAPI_URL = "http://127.0.0.1:8000/predict/";

    public Mono<Boolean> getPredictionAndCompare(int challengeNum, MultipartFile file) {
        WebClient webClient = webClientBuilder.build();
        return webClient.post()
                .uri(FASTAPI_URL)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("file", file.getResource()))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    int predictedClass = (int) response.get("predicted_class");

                    // 고양이와 강아지는 애완동물로 동일하게 처리
                    if ((challengeNum == 2 || challengeNum == 3) && (predictedClass == 2 || predictedClass == 3)) {
                        return true;
                    }

                    return challengeNum == predictedClass;
                });
    }
}
