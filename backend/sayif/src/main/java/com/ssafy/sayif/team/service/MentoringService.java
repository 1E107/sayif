package com.ssafy.sayif.team.service;

import com.ssafy.sayif.challenge.Repository.ChallengeRepository;
import com.ssafy.sayif.challenge.entity.Challenge;
import com.ssafy.sayif.challenge.entity.ChallengeList;
import com.ssafy.sayif.challenge.entity.ChallengeStatus;
import com.ssafy.sayif.challenge.Repository.ChallengeListRepository;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.entity.Tag;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.member.repository.TagRepository;
import com.ssafy.sayif.team.dto.MentorNicknameResponse;
import com.ssafy.sayif.team.dto.MentorProfileResponse;
import com.ssafy.sayif.team.dto.MentoringApplicationRequest;
import com.ssafy.sayif.team.dto.MentoringInfoResponseDto;
import com.ssafy.sayif.team.dto.MentoringRecruitRequest;
import com.ssafy.sayif.team.dto.MentoringSearchRequest;
import com.ssafy.sayif.team.dto.MentoringSearchResponse;
import com.ssafy.sayif.team.dto.TeamSessionResponse;
import com.ssafy.sayif.team.dto.TeamStatusResponse;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class MentoringService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final  MentorRepository mentorRepository;
    private final ChallengeRepository challengeRepository;
    private final ChallengeListRepository challengeListRepository;

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

            // Challenge 생성 및 저장
            for (int i = 1; i <= 7; i++) {
                Optional<ChallengeList> challengeList = challengeListRepository.findById(i);
                if (challengeList.isPresent()) {
                    Challenge challenge = Challenge.builder()
                            .team(team)
                            .challengeList(challengeList.get())
                            .status(ChallengeStatus.Before)
                            .build();
                    challengeRepository.save(challenge);
                }
            }
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
        String pmam;
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

        return mentorPage.stream().map(mentor -> {
            Member member = memberRepository.findById(mentor.getId())
                .orElseThrow(() -> new RuntimeException("Member not found"));
            return MentorProfileResponse.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .name(member.getName())
                .email(member.getEmail())
                .major(mentor.getMajor())
                .track(mentor.getTrack().toString())
                .profileImg(member.getProfileImg())
                .intro(mentor.getIntro())
                .regCode(mentor.getRegCode())
                .seq(mentor.getSeq())
                .tags(tagRepository.findAllByMentorId(member.getId()).stream().map(Tag::getContent)
                    .collect(Collectors.toList()))
                .build();
        }).collect(Collectors.toList());
    }


    public TeamStatusResponse getTeamStatus(Integer teamId) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(
                () -> new IllegalArgumentException("Team with ID " + teamId + " not found."));

        return TeamStatusResponse.builder()
            .status(team.getStatus())
            .build();
    }

    public List<MentorNicknameResponse> getMentorNicknames() {
        List<Member> memberList = memberRepository.findByRole(Role.Mentor);
        return memberList.stream()
            .map(member -> new MentorNicknameResponse(member.getNickname(), member.getUsername()))
            .collect(Collectors.toList());
    }

    public TeamSessionResponse getTeamSession(Integer teamId) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(
                () -> new IllegalArgumentException("Team with ID " + teamId + " not found."));

        return TeamSessionResponse.builder()
            .sessionId(team.getSessionId())
            .build();
    }

    @Transactional
    public MentoringInfoResponseDto getMentoringInfo(Integer teamId) {
        MentoringInfoResponseDto mentoringInfoResponseDto = new MentoringInfoResponseDto();
        // 멤버 정보 가져오기
        List<Member> teamMember = memberRepository.findByTeamId(teamId);
        for (Member member : teamMember) {
            if (member.getRole() == Role.Mentor) {
                if (mentoringInfoResponseDto.getMentor1Nickname() == null) {
                    mentoringInfoResponseDto.setMentor1Nickname(member.getNickname());
                } else {
                    mentoringInfoResponseDto.setMentor2Nickname(member.getNickname());
                }

            } else {
                mentoringInfoResponseDto.increaseMentee();
            }
        }

        // 멘토링 정보 가져오기
        Optional<Team> findTeam = teamRepository.findById(teamId);
        if (findTeam.isPresent()) {
            Team team = findTeam.get();
            LocalDate startDate = team.getStartDate();
            LocalDate deadlineDate = startDate.minusDays(3);

            mentoringInfoResponseDto.setId(team.getId());
            mentoringInfoResponseDto.setStartDate(startDate.toString());
            mentoringInfoResponseDto.setDeadlineDate(deadlineDate.toString());
        }
        return mentoringInfoResponseDto;
    }

}
