package com.ssafy.sayif.team.service;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.team.dto.*;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MentoringService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    private final  MentorRepository mentorRepository;

    @Transactional
    public Team recruit(MentoringRecruitRequest mentoringRecruitRequest, String username) {
        try {

            // LocalDate로 파싱
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startDate = LocalDate.parse(mentoringRecruitRequest.getStartDate(),
                dateFormatter);

            LocalDate endDate = startDate.plusMonths(1); // startDateTime에 한 달 추가

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime mentoringTime = LocalTime.parse(mentoringRecruitRequest.getTime(),
                timeFormatter);

            if ((mentoringTime.getHour() == 12 && mentoringRecruitRequest.getPmam().equals("오전")) ||
                (mentoringTime.getHour() != 12 && mentoringRecruitRequest.getPmam().equals("오후"))) {
                mentoringTime = mentoringTime.plusHours(12);
            }

            String nickName = memberRepository.findByUsername(username).getNickname();
            Team team = Team.builder()
                .name(nickName)
                .point(0)
                .startDate(startDate)
                .dayOfWeek(mentoringRecruitRequest.getDayOfWeek())
                .mentoringTime(mentoringTime)
                .endDate(endDate)
                .status(TeamStatus.Apply)
                .build();
            teamRepository.save(team);

            // username, 다른멘토 아이디 찾아서 멘토링 팀 번호 매칭
            memberRepository.updateTeamIdForUserIdOrPairId(team.getId(), username,
                mentoringRecruitRequest.getId());

            return team;
        } catch (Exception e) {
            log.error("Exception occurred: " + e.getMessage()); // 추가된 로그
            throw e;
        }
    }

    public List<MentoringSearchResponse> search(MentoringSearchRequest mentoringSearchRequest,
        int page_no, int size_no) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        LocalDate startDateFrom = LocalDate.parse(mentoringSearchRequest.getStartDateFrom(),
            dateFormatter);
        LocalDate startDateTo = LocalDate.parse(mentoringSearchRequest.getStartDateTo(),
            dateFormatter);
        LocalTime mentoringTime = LocalTime.parse(mentoringSearchRequest.getTime(), timeFormatter);

        if ((mentoringTime.getHour() == 12 && mentoringSearchRequest.getPmam().equals("오전")) ||
            (mentoringTime.getHour() != 12 && mentoringSearchRequest.getPmam().equals("오후"))) {
            mentoringTime = mentoringTime.plusHours(12);
        }

        log.info(mentoringTime.toString());

        Pageable pageable = PageRequest.of(page_no, size_no);
        Page<Team> teamsPage = teamRepository.findTeamsByStartDateBetweenAndMentoringTime(
            startDateFrom, startDateTo, mentoringTime, pageable);

        return teamsPage.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    private MentoringSearchResponse convertToDto(Team team) {
        // 멘토 닉네임 가져오기
        List<String> mentorNicknames = memberRepository.findMentorNicknamesByTeamId(team.getId(),
            Role.Mentor);
        String member1Nickname = !mentorNicknames.isEmpty() ? mentorNicknames.get(0) : "";
        String member2Nickname = mentorNicknames.size() > 1 ? mentorNicknames.get(1) : "";

        // 멘티 카운트 가져오기
        int menteeCount = memberRepository.countMenteesByTeamId(team.getId(), Role.Mentee);

        LocalTime mentoringTime = team.getMentoringTime();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String pmam = "";
        if (mentoringTime.getHour() >= 13 && mentoringTime.getHour() <= 23) {
            pmam = "오후";
            mentoringTime = mentoringTime.minusHours(12);
        } else if (mentoringTime.getHour() == 0) {
            pmam = "오전";
            mentoringTime = mentoringTime.plusHours(12);
        } else if (mentoringTime.getHour() == 12) {
            pmam = "오후";
        } else {
            pmam = "오전";
        }

        // LocalTime 객체를 문자열로 포맷하여 초 단위를 포함
        String formattedMentoringTime = mentoringTime.format(timeFormatter);

        return MentoringSearchResponse.builder()
            .id(team.getId())
            .startDate(team.getStartDate().toString())
            .dayOfWeek(team.getDayOfWeek())
            .time(formattedMentoringTime)
            .endDate(team.getEndDate().toString())
            .pmam(pmam)
            .mentor1Nickname(member1Nickname)
            .mentor2Nickname(member2Nickname)
            .menteeCnt(menteeCount)
            .build();
    }

    @Transactional
    public int application(MentoringApplicationRequest mentoringApplicationRequest,
        String username) {
        int teamId = mentoringApplicationRequest.getId();
        return memberRepository.updateMemberTeam(username, Role.Mentee, teamId);
    }


    @Transactional
    public List<MentorProfileResponse> profile(int pageNo, int sizeNo) {
        Pageable pageable = PageRequest.of(pageNo, sizeNo);
        Page<Mentor> mentorPage = mentorRepository.findAll(pageable);
        log.info(mentorPage.toString());
        List<MentorProfileResponse> mentorProfileResponses = mentorPage.stream().map(mentor -> {
            Member member = memberRepository.findById(mentor.getId()).orElseThrow(() -> new RuntimeException("Member not found"));
            return new MentorProfileResponse(
                    member.getId(),
                    member.getNickname(),
                    member.getName(),
                    member.getEmail(),
                    mentor.getMajor(),
                    mentor.getTrack().toString(),
                    member.getProfileImg(),
                    mentor.getIntro(),
                    mentor.getRegCode(),
                    mentor.getSeq()
            );
        }).collect(Collectors.toList());
        return mentorProfileResponses;
    }

    public TeamStatusResponse readStatus(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team with ID " + teamId + " not found."));

        return TeamStatusResponse.builder()
                .status(team.getStatus())
                .build();
    }

    public List<MentorNicknameResponse> getMentorNicknames() {
        List<Member> memberList = memberRepository.findByRole(Role.Mentor);
        return memberList.stream()
                .map(member -> new MentorNicknameResponse(member.getNickname()))
                .collect(Collectors.toList());
    }
}
