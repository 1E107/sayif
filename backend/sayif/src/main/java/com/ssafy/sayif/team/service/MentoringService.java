package com.ssafy.sayif.team.service;

import com.ssafy.sayif.team.dto.MentoringApplicationRequest;
import com.ssafy.sayif.team.dto.MentoringRecruitRequest;
import com.ssafy.sayif.team.dto.MentoringSearchRequest;
import com.ssafy.sayif.team.dto.MentoringSearchResponse;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.MentoringRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Service
public class MentoringService {

    @Autowired
    MentoringRepository mentoringRepository;

//    @Autowired
//    UserRepository userRepository;


    @Transactional
    public Team recruit(MentoringRecruitRequest mentoringRecruitRequest) {
//            public int recruit(@AuthenticationPrincipal UserService userService, RecruitRequestDto recruitRequestDto) {
//         시큐리티 하고 나면 유저아이디 이렇게 접근함
//        userService.getUserId();
        try {
            String userId = "ssafy";

            // LocalDate로 파싱
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startDate = LocalDate.parse(mentoringRecruitRequest.getStartDate(), dateFormatter);

            LocalDate endDate = startDate.plusMonths(1); // startDateTime에 한 달 추가


            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime mentoringTime = LocalTime.parse(mentoringRecruitRequest.getTime(), timeFormatter);

            if ((mentoringTime.getHour()==12 && mentoringRecruitRequest.getPmam().equals("오전")) ||
                    (mentoringTime.getHour()!=12 && mentoringRecruitRequest.getPmam().equals("오후"))){
                mentoringTime = mentoringTime.plusHours(12);
            }

            Team team = Team.builder()
                    // TODO: 일단 userId 저장으로 두고 userRepository 완성되면 nickname 찾아오는 걸로 수정하기
                    .name(userId)
                    .startDate(startDate)
                    .dayOfWeek(mentoringRecruitRequest.getDayOfWeek())
                    .mentoringTime(mentoringTime)
                    .endDate(endDate)
                    .status(TeamStatus.Apply)
                    .build();
            mentoringRepository.save(team);


            // TODO: userRepository에서 userId, 다른멘토 아이디 찾아서 멘토링 팀 번호 매칭
//            memberRepository.updateTeamIdForUserIdOrPairId(team.getId(), userId, mentoringRecruitRequest.getId());

            return team;
        } catch (Exception e) {
            log.error("Exception occurred: " + e.getMessage()); // 추가된 로그
            throw e;
        }
    }

    public List<MentoringSearchResponse> search(MentoringSearchRequest mentoringSearchRequest, int page_no, int size_no) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        LocalDate startDateFrom = LocalDate.parse(mentoringSearchRequest.getStartDateFrom(), dateFormatter);
        LocalDate startDateTo = LocalDate.parse(mentoringSearchRequest.getStartDateTo(), dateFormatter);
        LocalTime mentoringTime = LocalTime.parse(mentoringSearchRequest.getTime(), timeFormatter);

        if ((mentoringTime.getHour()==12 && mentoringSearchRequest.getPmam().equals("오전")) ||
                (mentoringTime.getHour()!=12 && mentoringSearchRequest.getPmam().equals("오후"))){
            mentoringTime = mentoringTime.plusHours(12);
        }

//        List<Team> teams = mentoringRepository.findTeamsByStartDateBetweenAndMentoringTime(startDateFrom, startDateTo, mentoringTime);
        Pageable pageable = PageRequest.of(page_no, size_no);
        Page<Team> teamsPage = mentoringRepository.findTeamsByStartDateBetweenAndMentoringTime(startDateFrom, startDateTo, mentoringTime, pageable);


//        return teams.stream().map(this::convertToDto).collect(Collectors.toList());
        return teamsPage.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private MentoringSearchResponse convertToDto(Team team) {
        // TODO: userRepository에서 team.getId()로 해당하는 멘토 닉네임 가져와서 set하기
        // 멘토 닉네임 가져오기
//        List<String> mentorNicknames = memberRepository.findMentorNicknamesByTeamId(team.getId());
//        String member1Nickname = mentorNicknames.size() > 0 ? mentorNicknames.get(0) : "";
//        String member2Nickname = mentorNicknames.size() > 1 ? mentorNicknames.get(1) : "";

        // TODO: userRepository에서 team.getId()에 해당하는 멘티 카운트 가져와서 set하기
        // 멘티 카운트 가져오기
//        int menteeCount = memberRepository.countMenteesByTeamId(team.getId());

        LocalTime mentoringTime = team.getMentoringTime();
        String pmam = "";
        if (mentoringTime.getHour()>=13 && mentoringTime.getHour() <= 23){
            pmam = "오후";
            mentoringTime.minusHours(12);
        } else if (mentoringTime.getHour() == 0){
            pmam = "오전";
            mentoringTime.plusHours(12);
        } else {
            pmam = "오전";
        }
        return MentoringSearchResponse.builder()
                .startDate(team.getStartDate().toString())
                .dayOfWeek(team.getDayOfWeek())
                .time(mentoringTime.toString())
                .endDate(team.getEndDate().toString())
                .pmam(pmam)
//                .mentor1Nickname(member1Nickname)
//                .mentor2Nickname(member2Nickname)
//                .menteeCnt(menteeCount)
                .build();
    }

//    public int application(MentoringApplicationRequest mentoringApplicationRequest) {
//
//    }
}