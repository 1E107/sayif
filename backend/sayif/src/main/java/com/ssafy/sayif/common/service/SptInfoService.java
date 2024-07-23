package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.entity.SptInfo;
import com.ssafy.sayif.common.repository.SptInfoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class SptInfoService {

    private final SptInfoRepository sptInfoRepository;

    public List<SptInfo> findAll() {
        return sptInfoRepository.findAll();
    }

    public Optional<SptInfo> findById(Integer id) {
        return sptInfoRepository.findById(id);
    }

}
