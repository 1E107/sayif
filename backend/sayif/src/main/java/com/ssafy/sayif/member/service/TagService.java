package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.TagRequestDto;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Tag;
import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.member.repository.TagRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ssafy.sayif.member.dto.TagResponseDto;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final MemberRepository memberRepository;
    private final MentorRepository mentorRepository;

    @Transactional
    public void saveTags(String username, TagRequestDto tagContents) {
        Mentor mentor = mentorRepository.findByUsername(username);
        for (String tagContent : tagContents.getContents()) {
            Tag tag = new Tag();
            tag.createTag(mentor, tagContent);
            tagRepository.save(tag);
        }
    }

    @Transactional
    public List<TagResponseDto> getTagsForMember(String username) {
        Mentor mentor = mentorRepository.findByUsername(username);
        List<Tag> tags = tagRepository.findByMentorAndIsRemoveFalse(mentor);
        return tags.stream()
                .map(tag -> new TagResponseDto(tag.getId(), tag.getContent()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTag(Long tagId, String username) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        if (optionalTag.isPresent()) {
            Tag tag = optionalTag.get();
            if (tag.getMentor().getUsername().equals(username)) {
                tag.setRemove(true);
                tagRepository.save(tag);
            } else {
                throw new UnauthorizedException("로그인한 사용자의 태그가 아닙니다.");
            }
        } else {
            throw new IllegalArgumentException("Tag not found");
        }
    }
}
