package com.ssafy.sayif.team.repository;

import com.ssafy.sayif.team.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    Page<Material> findByTeamId(Integer teamId, Pageable pageable);
}
