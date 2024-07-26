package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.team.dto.MentorProfileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Integer> {
}
