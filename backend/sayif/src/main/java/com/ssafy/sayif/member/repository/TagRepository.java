package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Tag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByMentorAndIsRemoveFalse(Mentor mentor);

    List<Tag> findAllByMentorId(Integer id);
}

