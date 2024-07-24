package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.entity.SptInfo;
import com.ssafy.sayif.common.service.SptInfoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping
    public List<SptInfo> getAllSptInfo() {
        log.info("자립 지원 사업 전체 조회");
        return sptInfoService.findAll();
    }

    @GetMapping("/{id}")
    public SptInfo getSptInfo(@PathVariable("id") int id) {
        log.info("자립 지원 사업 단일 조회");
        return sptInfoService.findById(id).orElse(null);
    }


}
