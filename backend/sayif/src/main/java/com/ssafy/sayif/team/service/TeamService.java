package com.ssafy.sayif.team.service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.team.dto.PointResponseDto;
import com.ssafy.sayif.team.dto.PointUpdateRequestDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.team.util.TeamConstants;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final MenteeRepository menteeRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;

    public List<Member> getMembersByTeamId(Integer teamId) {
        return memberRepository.findByTeamId(teamId);
    }

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void processTeamStatuses() {
        List<Team> applyTeams = teamRepository.findByStatus(TeamStatus.Apply);

        for (Team team : applyTeams) {
            if (shouldUpdateToProceed(team)) {
                team.updateStatus(TeamStatus.Proceed);
                teamRepository.save(team);
                messagingTemplate.convertAndSend("/topic/" + team.getId(), "채팅방이 생성되었습니다.");
            } else {
                team.updateStatus(TeamStatus.Cancel);
                teamRepository.save(team);
            }
        }
    }

    private boolean shouldUpdateToProceed(Team team) {
        LocalDateTime threeDaysBeforeStartDate = team.getStartDate().minusDays(3).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(threeDaysBeforeStartDate)) {
            return false;
        }

        int menteeCount = menteeRepository.countByTeamId(team.getId());

        return menteeCount >= TeamConstants.MINIMUM_REQUIRED_MENTEES;
    }

    public PointResponseDto getTeamExperienceById(Integer id) {
        Team team = teamRepository.findById(id).orElse(null);
        if (team != null) {
            return new PointResponseDto(team.getPoint());
        } else {
            return null;
        }
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
    public Team updateTeamName(Integer teamId, String newName) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        team.changeName(newName);
        return teamRepository.save(team);
    }
}