//package com.ssafy.sayif.team.service;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class TeamServiceTest {
//    @Autowired
//    private TeamService teamService;
//
//    @Test
//    public void testProcessTeamStatuses() {
//        // 테스트용으로 자정 시간을 설정
//        LocalDateTime midnight = LocalDateTime.now(ZoneId.of("Asia/Seoul")).withHour(0).withMinute(0).withSecond(0).withNano(0);
//
//        // 자정 시간으로 processTeamStatuses 메서드 호출
//        teamService.processTeamStatuses(midnight);
//
//    }
//}