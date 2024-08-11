package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.dto.SptInfoResponseDto;
import com.ssafy.sayif.common.entity.SptInfo;
import com.ssafy.sayif.common.repository.SptInfoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class SptInfoService {

    private final SptInfoRepository sptInfoRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket-names.spt-info}")
    private String bucketName;

    public Optional<SptInfoResponseDto> findById(Integer id) {
        return sptInfoRepository.findById(id)
            .map(this::convertToDto);
    }

    public List<SptInfoResponseDto> findAllPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return sptInfoRepository.findAll(pageable)
            .getContent()
            .stream()
            .map(this::convertToDto)
            .toList();
    }

    private SptInfoResponseDto convertToDto(SptInfo sptInfo) {
        return SptInfoResponseDto.builder()
            .id(sptInfo.getId())
            .title(sptInfo.getTitle())
            .ranged(sptInfo.getRanged())
            .region(sptInfo.getRegion())
            .recruitStart(sptInfo.getRecruitStart())
            .recruitEnd(sptInfo.getRecruitEnd())
            .hitCount(sptInfo.getHitCount())
            .method(sptInfo.getMethod())
            .fileUrl(s3Service.getUrl(sptInfo.getImg(), bucketName))
            .build();
    }
}
