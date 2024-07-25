package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.entity.SptInfo;
import com.ssafy.sayif.common.repository.SptInfoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class SptInfoService {

    private final SptInfoRepository sptInfoRepository;

    public Optional<SptInfo> findById(Integer id) {
        return sptInfoRepository.findById(id);
    }

    public List<SptInfo> findAllPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return sptInfoRepository.findAll(pageable).getContent();
    }
}
