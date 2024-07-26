package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.common.entity.Letter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Integer> {

    Page<Letter> findByReceiveMemberIdOrderByCreatedAtDesc(int receiveMemberId, Pageable pageable);

}
