package com.ssafy.sayif.challenge.controller;

import com.ssafy.sayif.challenge.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;


    @PostMapping("/predict")
    public Mono<String> predict(@RequestParam("file") MultipartFile file) {
        return challengeService.getPrediction(file);
    }
}
