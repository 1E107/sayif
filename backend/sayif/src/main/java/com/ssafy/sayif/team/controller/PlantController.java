package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.PointResponseDto;
import com.ssafy.sayif.team.dto.PointUpdateRequestDto;
import com.ssafy.sayif.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/exp")
public class PlantController {
    private final TeamService teamService;

    @GetMapping("/{id}")
    public ResponseEntity<PointResponseDto> getTeamExperience(@PathVariable Integer id) {
        PointResponseDto pointResponseDto = teamService.getTeamExperienceById(id);
        if (pointResponseDto != null) {
            return ResponseEntity.ok(pointResponseDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PointResponseDto> updateTeamExperience(@PathVariable Integer id, @RequestBody PointUpdateRequestDto request) {
        PointResponseDto pointResponse = teamService.updateTeamExperienceById(id, request);
        if (pointResponse != null) {
            return ResponseEntity.ok(pointResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
