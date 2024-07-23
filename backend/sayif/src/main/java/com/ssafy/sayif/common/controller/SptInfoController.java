package com.ssafy.sayif.common.controller;

import com.ssafy.sayif.common.entity.SptInfo;
import com.ssafy.sayif.common.service.SptInfoService;
import java.util.List;
import java.util.Optional;
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
        for (SptInfo sptInfo : sptInfoService.findAll()) {
            log.info(sptInfo.toString());
        }
        return sptInfoService.findAll();
    }

    @GetMapping("/{id}")
    public SptInfo getSptInfo(@PathVariable("id") int id) {
        Optional<SptInfo> sptInfo = sptInfoService.findById(id);
        log.info(sptInfo.toString());
        return sptInfo.orElse(null);
    }


}
