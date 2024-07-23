package com.ssafy.sayif.team.service;

import com.ssafy.sayif.team.dto.RecruitRequestDto;
import com.ssafy.sayif.team.dto.SearchRequestDto;
import com.ssafy.sayif.team.dto.SearchResponseDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamStatus;
import com.ssafy.sayif.team.repository.MentoringRepository;
import com.ssafy.sayif.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MentoringService {

    @Autowired
    MentoringRepository mentoringRepository;

//    @Autowired
//    UserRepository userRepository;

    @Transactional
    public int recruit(RecruitRequestDto recruitRequestDto) {
//    public int recruit(@AuthenticationPrincipal UserService userService, RecruitRequestDto recruitRequestDto) {
        // 시큐리티 하고 나면 유저아이디 이렇게 접근함
//        userService.getUserId();
        String userId = "ssafy";
        LocalDateTime startDate = LocalDateTime.parse(recruitRequestDto.getStartDate(),DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDateTime endDate = startDate.plusMonths(1);
        LocalTime mentoringTime = LocalTime.parse(recruitRequestDto.getStartDate(),DateTimeFormatter.ofPattern("HH:mm"));
        if (recruitRequestDto.getPmam().equals("오후")){
            mentoringTime = mentoringTime.plusHours(12);
        }

        Team team = Team.builder()
                // TODO: 일단 userId 저장으로 두고 userRepository 완성되면 nickname 찾아오는 걸로 수정하기
                .name(userId)
                .startDate(startDate)
                .dayOfWeek(recruitRequestDto.getDayOfWeek())
                .mentoringTime(mentoringTime)
                .endDate(endDate)
                .status(TeamStatus.Apply)
                .build();

        mentoringRepository.save(team);
        int teamId = team.getId();

        // TODO: userRepository에서 userId, 다른멘토 아이디 찾아서 멘토링 팀 번호 매칭

        return teamId;
    }


}
