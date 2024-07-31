package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.converter.MemberConverter;
import com.ssafy.sayif.team.converter.TeamNameConverter;
import com.ssafy.sayif.team.dto.MemberInfoResponseDto;
import com.ssafy.sayif.team.dto.TeamNameResponseDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/team/{id}")
@RequiredArgsConstructor
public class TeamController {

    private final MemberConverter memberConverter;
    private final TeamService teamService;
    private final TeamNameConverter teamNameConverter;

    @GetMapping("/member-info")
    public ResponseEntity<List<MemberInfoResponseDto>> getTeamMembers(@PathVariable Integer id) {
        List<Member> members = teamService.getMembersByTeamId(id);
        if (members.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        List<MemberInfoResponseDto> memberDTOs = members.stream()
                .map(memberConverter::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(memberDTOs);
    }

    @PutMapping("/team-name")
    public ResponseEntity<TeamNameResponseDto> updateTeamName(@PathVariable Integer id, @RequestParam String newName) {
        Team team = teamService.updateTeamName(id, newName);
        TeamNameResponseDto responseDto = teamNameConverter.convertToDto(team);
        return ResponseEntity.ok(responseDto);
    }
}
