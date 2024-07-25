package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.service.SptInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spt-info")
@Slf4j
public class SptInfoController {

    private final SptInfoService sptInfoService;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getSptInfo(@PathVariable("id") int id) {
        log.info("자립 지원 사업 단일 조회 - ID: {}", id);
        return ResponseEntity.ok(sptInfoService.findById(id).orElse(null));
    }

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getPagedSptInfo(@PathVariable("page") int page,
        @PathVariable("size") int size) {
        log.info("페이징 처리 - 페이지: {}, 크기: {}", page, size);
        return ResponseEntity.ok(sptInfoService.findAllPaged(page, size));
    }
}
