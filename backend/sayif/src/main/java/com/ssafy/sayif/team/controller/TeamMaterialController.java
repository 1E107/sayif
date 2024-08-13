package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.common.service.S3Service;
import com.ssafy.sayif.team.dto.MaterialResponseDto;
import com.ssafy.sayif.team.service.MaterialService;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/material")
public class TeamMaterialController {

    private final MaterialService materialService;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket-names.material}")
    private String bucketName;

    @GetMapping("/{page}/{size}")
    public Page<MaterialResponseDto> getMaterials(@AuthenticationPrincipal UserDetails userDetails,
        @PathVariable int page, @PathVariable int size) {
        String username = userDetails.getUsername();
        return materialService.getMaterialsByTeamId(username, page, size);
    }

    @GetMapping("/detail/{material_id}")
    public MaterialResponseDto getMaterialDetail(@PathVariable Integer material_id) {
        return materialService.getMaterialDetail(material_id);
    }

    @GetMapping("/download")
    public ResponseEntity<InputStreamResource> downloadFile(@RequestParam String fileUrl) {
        InputStream inputStream = s3Service.downloadFileFromS3(fileUrl, bucketName);
        InputStreamResource resource = new InputStreamResource(inputStream);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "filename")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
    }
}
