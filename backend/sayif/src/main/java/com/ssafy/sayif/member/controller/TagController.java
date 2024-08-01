package com.ssafy.sayif.member.controller;

import com.ssafy.sayif.member.dto.TagDeleteRequestDto;
import com.ssafy.sayif.member.dto.TagRequestDto;
import com.ssafy.sayif.member.dto.TagResponseDto;
import com.ssafy.sayif.member.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping("/tag")
    public ResponseEntity<Void> addTags(@RequestBody TagRequestDto tagRequestDto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        tagService.saveTags(username, tagRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tag")
    public ResponseEntity<TagResponseDto> getTagsForMember(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<String> tagContents = tagService.getTagsForMember(username);
        TagResponseDto response = new TagResponseDto(tagContents);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/tag")
    public ResponseEntity<Void> deleteTag(@RequestBody TagDeleteRequestDto tagDeleteRequestDto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        tagService.deleteTag(tagDeleteRequestDto.getTagId(), username);
        return ResponseEntity.ok().build();
    }
}
