package com.ssafy.sayif.team.service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.team.util.TeamConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final MenteeRepository menteeRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;

    public List<Member> getMembersByTeamId(Long teamId) {
        return memberRepository.findByTeamId(teamId);
    }

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void processTeamStatuses() {
        List<Team> applyTeams = teamRepository.findByStatus(TeamStatus.Apply);

        for (Team team : applyTeams) {
            if (shouldUpdateToProceed(team)) {
                team.setStatus(TeamStatus.Proceed);
                teamRepository.save(team);
                messagingTemplate.convertAndSend("/topic/" + team.getId(), "채팅방이 생성되었습니다.");
            } else {
                team.setStatus(TeamStatus.Cancel);
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
}