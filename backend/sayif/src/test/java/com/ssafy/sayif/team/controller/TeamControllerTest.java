package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.entity.Mentee;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.ssafy.sayif.team.service.TeamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TeamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MenteeRepository menteeRepository;

    @MockBean
    private MentorRepository mentorRepository;

    @MockBean
    private TeamRepository teamRepository;

    @MockBean
    private TeamService teamService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        Team team = Team.builder()
                .id(1)
                .name("Test Team")
                .point(10)
                .build();

        Mentor mentor = new Mentor();
        mentor.setTeam(team);

        Mentee mentee = new Mentee();
        mentee.setTeam(team);

        List<Member> members = List.of(mentor, mentee);
        when(teamService.getMembersByTeamId(1)).thenReturn(members);

        // 로그 추가: 목 객체 설정 후 검증
        System.out.println("teamService.getMembersByTeamId(1): " + teamService.getMembersByTeamId(1));
    }

    @Test
    public void testGetTeamMembers() throws Exception {
        System.out.println("Starting testGetTeamMembers...");

        mockMvc.perform(get("/team/1/member-info")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        System.out.println("testGetTeamMembers finished.");
    }
}
