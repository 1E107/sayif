package com.ssafy.sayif.member.service;

import com.ssafy.sayif.member.dto.TagRequestDto;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Tag;
import com.ssafy.sayif.member.exception.UnauthorizedException;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.internal.util.collections.ReadOnlyMap;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void saveTags(String username, TagRequestDto tagContents) {
        Member member = memberRepository.findByUsername(username);
        for (String tagContent : tagContents.getContents()) {
            Tag tag = new Tag();
            tag.createTag(member, tagContent);
            tagRepository.save(tag);
        }
    }

    @Transactional
    public List<String> getTagsForMember(String username) {
        Member member = memberRepository.findByUsername(username);
        List<Tag> tags = tagRepository.findByMemberAndIsRemoveFalse(member);
        List<String> collect = new ArrayList<>();
        for (Tag tag : tags) {
            String content = tag.getContent();
            collect.add(content);
        }
        return collect;
    }

    @Transactional
    public void deleteTag(Long tagId, String username) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        if (optionalTag.isPresent()) {
            Tag tag = optionalTag.get();
            if (tag.getMember().getUsername().equals(username)) {
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
