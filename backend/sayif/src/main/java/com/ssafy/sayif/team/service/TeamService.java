package com.ssafy.sayif.team.service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.service.MemberService;
import com.ssafy.sayif.team.dto.GetChatResponseDto;
import com.ssafy.sayif.team.dto.PointResponseDto;
import com.ssafy.sayif.team.dto.PointUpdateRequestDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamMsg;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.TeamMsgRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.team.util.TeamConstants;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static org.bouncycastle.asn1.x500.style.RFC4519Style.member;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final MenteeRepository menteeRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final TeamMsgRepository teamMsgRepository;

    public List<Member> getMembersByTeamId(Integer teamId) {
        List<Member> members = memberRepository.findByTeamId(teamId);
        return members;
    }

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 팀 상태 변경
    public void processTeamStatuses() {
        List<Team> applyTeams = teamRepository.findByStatus(TeamStatus.Apply);

        for (Team team : applyTeams) {
            if (isThreeDaysBeforeStartDate(team)) { // 3일 남은 팀만 상태를 변경하도록 체크
                if (shouldUpdateToProceed(team)) {
                    team.updateStatus(TeamStatus.Proceed);
                    teamRepository.save(team);
                    TeamMsg message = TeamMsg.builder()
                            .msgContent(team.getName() + "팀의 채팅방이 생성되었습니다 !")
                            .member(memberService.getMemberByUsername("관리자1"))
                            .team(team)
                            .sendAt(LocalDateTime.now())
                            .build();

                    teamMsgRepository.save(message);
                } else {
                    team.updateStatus(TeamStatus.Cancel);
                    teamRepository.save(team);
                }
            }
        }
    }

    private boolean isThreeDaysBeforeStartDate(Team team) {
        LocalDateTime threeDaysBeforeStartDate = team.getStartDate().minusDays(3).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        return now.isAfter(threeDaysBeforeStartDate) || now.isEqual(threeDaysBeforeStartDate);
    }

    private boolean shouldUpdateToProceed(Team team) {
        int menteeCount = menteeRepository.countByTeamId(team.getId());

        return menteeCount >= TeamConstants.MINIMUM_REQUIRED_MENTEES;
    }

    public PointResponseDto updateTeamExperienceById(Integer id, PointUpdateRequestDto request) {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if (optionalTeam.isPresent()) {
            Team team = optionalTeam.get();
            team.updatePoint(request.getPoint());
            teamRepository.save(team);
            return new PointResponseDto(team.getPoint());
        } else {
            return null;
        }
    }

    @Transactional
    public Team registerTeamName(Integer teamId, String newName) {
        Team team = teamRepository.findById(teamId).orElse(null);
        if (team != null) {
            team.registerName(newName);
        }
        return team;
    }

    @Transactional
    public Team updateTeamName(Integer teamId, String newName) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        team.changeName(newName);
        return teamRepository.save(team);
    }

    public Team getTeamName(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return team;
    }
}