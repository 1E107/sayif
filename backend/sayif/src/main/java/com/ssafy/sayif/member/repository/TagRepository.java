package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByMemberAndIsRemoveFalse(Member member);
}

