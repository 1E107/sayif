package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    List<Story> findByTeamId(Integer teamId);
}
