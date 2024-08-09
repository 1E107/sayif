package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Mentor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Integer> {

    Mentor findByUsername(String username);

    List<Mentor> findAllMentorByTeamId(Integer teamId);
}
