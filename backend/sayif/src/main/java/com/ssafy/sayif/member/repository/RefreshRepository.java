package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Refresh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {

    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);

    List<Refresh> findByMemberId(String memberId);
    void deleteByMemberId(String memberId);
}
