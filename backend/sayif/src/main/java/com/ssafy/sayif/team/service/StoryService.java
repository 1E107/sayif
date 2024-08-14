package com.ssafy.sayif.team.service;

import com.ssafy.sayif.team.entity.Story;
import com.ssafy.sayif.team.repository.StoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    }

    public List<Story> getAllStoriesByTeamId(Integer teamId) {
        return storyRepository.findByTeamId(teamId);
    }

    public Story findStoryById(Integer contentId) {
        return storyRepository.findById(contentId)
            .orElseThrow(() -> new IllegalArgumentException("스토리를 찾을 수 없습니다: " + contentId));
    }

    public void setStoryAsRead(Integer contentId) {
        Story story = findStoryById(contentId);
        story.read();
        storyRepository.save(story);
    }
}
