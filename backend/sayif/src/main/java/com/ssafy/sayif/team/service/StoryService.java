package com.ssafy.sayif.team.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ssafy.sayif.team.entity.Story;
import com.ssafy.sayif.team.repository.StoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepository storyRepository;

    public Story saveStory(Story story) {
        validateStoryContent(story.getContent());
        return storyRepository.save(story);
    }

    private void validateStoryContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("스토리 내용은 필수입니다.");
        }
        if (content.length() > 100) {
            throw new IllegalArgumentException("스토리 내용은 100자를 초과할 수 없습니다.");
        }
    }

    public List<Story> getAllStoriesByTeamId(Integer teamId) {
        return storyRepository.findByTeamId(teamId);
    }
}
