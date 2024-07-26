package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.LetterResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LetterService {
    void sendLetter(String title, String content, String senderId, String receiverId);
    LetterResponseDto getLetterById(int letterId, String memberId);
    Page<LetterResponseDto> getReceivedLetters(String memberId, Pageable pageable);
}