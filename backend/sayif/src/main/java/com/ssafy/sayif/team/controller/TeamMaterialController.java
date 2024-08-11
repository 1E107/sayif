package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.MaterialResponseDto;
import com.ssafy.sayif.team.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/material")
public class TeamMaterialController {

    private final MaterialService materialService;

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
}
