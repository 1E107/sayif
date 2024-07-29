package com.ssafy.sayif.member.service;

import com.ssafy.sayif.common.entity.Letter;
import com.ssafy.sayif.member.dto.LetterResponseDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.LetterRepository;
import com.ssafy.sayif.member.repository.MemberRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LetterService {

    private final LetterRepository letterRepository;
    private final MemberRepository memberRepository;

    public void sendLetter(String title, String content, String senderId, String receiverId) {
        Member sender = memberRepository.findByUsername(senderId);
        Member receiver = memberRepository.findByUsername(receiverId);

        Letter letter = Letter.builder()
            .title(title)
            .content(content)
            .sendMember(sender)
            .receiveMember(receiver)
            .build();

        letterRepository.save(letter);
    }

    public LetterResponseDto getLetterById(int letterId, String username) {
        Letter letter = letterRepository.findById(letterId)
            .orElseThrow(() -> new IllegalArgumentException("잘못된 편지 ID입니다"));

        if (!letter.getSendMember().getUsername().equals(username) && !letter.getReceiveMember()
            .getUsername().equals(username)) {
            throw new IllegalArgumentException("해당 편지를 볼 권한이 없습니다.");
        }

        LetterResponseDto responseDto = new LetterResponseDto();
        responseDto.setId(letter.getId());
        responseDto.setTitle(letter.getTitle());
        responseDto.setContent(letter.getContent());
        responseDto.setSendId(letter.getSendMember().getUsername());
        responseDto.setReceiveId(letter.getReceiveMember().getUsername());
        responseDto.setCreatedAt(letter.getCreatedAt());
        responseDto.setModifiedAt(letter.getModifiedAt());

        return responseDto;
    }

    public Page<LetterResponseDto> getReceivedLetters(String username, Pageable pageable) {
        Member loginMember = memberRepository.findByUsername(username);
        Page<Letter> letters = letterRepository.findByReceiveMemberIdOrderByCreatedAtDesc(
            loginMember.getId(), pageable);
        List<LetterResponseDto> letterResponseDtos = letters.stream().map(letter -> {
            LetterResponseDto dto = new LetterResponseDto();
            dto.setId(letter.getId());
            dto.setTitle(letter.getTitle());
            dto.setContent(letter.getContent());
            dto.setSendId(letter.getSendMember().getUsername());
            dto.setReceiveId(letter.getReceiveMember().getUsername());
            dto.setCreatedAt(letter.getCreatedAt());
            dto.setModifiedAt(letter.getModifiedAt());
            return dto;
        }).collect(Collectors.toList());

        return new PageImpl<>(letterResponseDtos, pageable, letters.getTotalElements());
    }
}
