package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TeamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MenteeRepository menteeRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetTeamMembers() throws Exception {
        // 실제 데이터베이스에 데이터가 이미 있는 경우 해당 데이터의 ID를 사용하여 테스트 수행
        mockMvc.perform(get("/team/1/member-info")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print()) // 응답 내용을 콘솔에 출력
                .andExpect(status().isOk());
    }
}
