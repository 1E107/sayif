package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Boolean existsByMemberId(String memberId);

    Member findByMemberId(String memberId);
}
