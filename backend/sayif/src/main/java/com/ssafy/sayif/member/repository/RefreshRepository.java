package com.ssafy.sayif.member.repository;

import com.ssafy.sayif.member.entity.Refresh;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {

    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);

    List<Refresh> findByUsername(String username);

    @Transactional
    void deleteAllByUsername(String username);
}
