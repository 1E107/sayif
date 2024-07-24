package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenteeRepository extends JpaRepository<Mentee, Integer> {

    int countByTeamId(Integer id);
}
