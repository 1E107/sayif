package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.dto.ChatCompletionDto;
import com.ssafy.sayif.common.service.ChatBotService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chatgpt")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatBotService;

    @PostMapping
    public ResponseEntity<?> chat(@RequestBody ChatCompletionDto chatCompletionDto) {
        Map<String, Object> result = chatBotService.getChatGptResponse(chatCompletionDto);
        return ResponseEntity.ok(result);
    }
}
