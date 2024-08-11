package com.ssafy.sayif.team.service;

import com.ssafy.sayif.common.service.S3Service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.dto.MaterialResponseDto;
import com.ssafy.sayif.team.entity.Material;
import com.ssafy.sayif.team.repository.MaterialRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket-names.material}")
    private String bucketName;

    public Page<MaterialResponseDto> getMaterialsByTeamId(String username, int page, int size) {
        Member member = memberRepository.findByUsername(username);
        Integer teamId = member.getTeam().getId();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Material> materials = materialRepository.findByTeamId(teamId, pageable);

        List<MaterialResponseDto> materialList = new ArrayList<>();
        for (Material material : materials) {
            MaterialResponseDto materialDTO = convertToDTO(material);
            materialList.add(materialDTO);
        }

        return new PageImpl<>(materialList, pageable, materials.getTotalElements());
    }

    public MaterialResponseDto getMaterialDetail(Integer materialId) {
        Optional<Material> materialOptional = materialRepository.findById(materialId);
        Material material = materialOptional.orElseThrow(
            () -> new IllegalArgumentException("Material not found"));
        return convertToDetailDTO(material);
    }


    // 객체를 Dto로 변환 (리스트용)
    private MaterialResponseDto convertToDTO(Material material) {
        return MaterialResponseDto.builder()
            .id(material.getId())
            .title(material.getTitle())
            .createdAt(material.getCreatedAt())
            .fileUrl(s3Service.getUrl(material.getFile(), bucketName))
            .hit(material.getHit())
            .build();
    }

    // 객체를 Dto로 변환 (상세 조회용)
    private MaterialResponseDto convertToDetailDTO(Material material) {
        return MaterialResponseDto.builder()
            .id(material.getId())
            .title(material.getTitle())
            .content(material.getContent())
            .createdAt(material.getCreatedAt())
            .fileUrl(s3Service.getUrl(material.getFile(), bucketName))
            .hit(material.getHit())
            .file(material.getFile())
            .chapter(material.getChapter())
            .build();
    }
}
