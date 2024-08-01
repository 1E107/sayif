package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.member.dto.LetterRequestDto;
import com.ssafy.sayif.member.dto.LetterResponseDto;
import com.ssafy.sayif.member.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    @PostMapping("/message")
    public ResponseEntity<String> sendLetter(@RequestBody LetterRequestDto request,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        String sender = userDetails.getUsername();
        letterService.sendLetter(request.getTitle(), request.getContent(), sender,
                request.getReceiver());
        return ResponseEntity.ok("Message sent successfully.");
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<LetterResponseDto> getLetter(@PathVariable int id,
                                                       @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        LetterResponseDto letter = letterService.getLetterById(id, username);
        return ResponseEntity.ok(letter);
    }

    @GetMapping("/message/{page_no}/{size_no}")
    public ResponseEntity<Page<LetterResponseDto>> getReceivedLetters(@PathVariable int page_no,
                                                                      @PathVariable int size_no, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Pageable pageable = PageRequest.of(page_no - 1, size_no); // 페이지 번호는 0부터 시작하므로 -1
        Page<LetterResponseDto> letters = letterService.getReceivedLetters(username, pageable);
        return ResponseEntity.ok(letters);
    }
}
