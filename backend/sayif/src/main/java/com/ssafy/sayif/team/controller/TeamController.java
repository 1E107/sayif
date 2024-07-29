package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.converter.MemberConverter;
import com.ssafy.sayif.team.dto.MemberInfoResponseDto;
import com.ssafy.sayif.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final MemberConverter memberConverter;
    private final TeamService teamService;
    private final MemberRepository memberRepository;

    @GetMapping("/{id}/member-info")
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
}
