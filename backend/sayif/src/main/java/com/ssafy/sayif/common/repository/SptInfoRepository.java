package com.ssafy.sayif.common.repository;

import com.ssafy.sayif.common.entity.SptInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SptInfoRepository extends JpaRepository<SptInfo, Integer> {

}
