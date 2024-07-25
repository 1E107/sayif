package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {
    List<History> findByMemberId(int memberId);
}
