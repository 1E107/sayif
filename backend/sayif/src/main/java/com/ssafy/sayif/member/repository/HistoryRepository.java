package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.History;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {

    List<History> findByMemberId(int memberId);
}
