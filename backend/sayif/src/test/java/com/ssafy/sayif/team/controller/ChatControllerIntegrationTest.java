//package com.ssafy.sayif.team.controller;
//
//import com.ssafy.sayif.member.entity.Member;
//import com.ssafy.sayif.member.repository.MemberRepository;
//import com.ssafy.sayif.team.entity.Team;
//import com.ssafy.sayif.team.entity.TeamMsg;
//import com.ssafy.sayif.team.entity.TeamStatus;
//import com.ssafy.sayif.team.repository.TeamMsgRepository;
//import com.ssafy.sayif.team.repository.TeamRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.server.LocalServerPort;
//import org.springframework.messaging.converter.MappingJackson2MessageConverter;
//import org.springframework.messaging.simp.stomp.StompHeaders;
//import org.springframework.messaging.simp.stomp.StompSession;
//import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
//import org.springframework.security.authentication.TestingAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.web.socket.client.standard.StandardWebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.util.concurrent.ArrayBlockingQueue;
//import java.util.concurrent.BlockingQueue;
//import java.util.concurrent.TimeUnit;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@ActiveProfiles("test")
//public class ChatControllerIntegrationTest {
//
//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TeamRepository teamRepository;
//
//    @Autowired
//    private TeamMsgRepository teamMsgRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    private Member member;
//    private Team team;
//
//    @BeforeEach
//    public void setup() {
//        member = new Member();
//        member.setName("Test User");
//        member = memberRepository.save(member);
//
//        team = Team.builder()
//                .name("Test Team")
//                .startDate(LocalDate.now())
//                .dayOfWeek("Monday")
//                .mentoringTime(LocalTime.NOON)
//                .endDate(LocalDate.now().plusDays(7))
//                .status(TeamStatus.Proceed)
//                .build();
//        team = teamRepository.save(team);
//
//        // 가짜 인증 객체 설정
//        SecurityContextHolder.getContext().setAuthentication(
//                new TestingAuthenticationToken(member, null, "ROLE_USER")
//        );
//    }
//
//    @Test
//    public void testWebSocketChat() throws Exception {
//        WebSocketStompClient stompClient = new WebSocketStompClient(new StandardWebSocketClient());
//        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
//
//        BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(1);
//
//        String url = "ws://localhost:" + port + "/ws";
//        StompSession session = stompClient.connect(url, new StompSessionHandlerAdapter() {
//        }).get(1, TimeUnit.SECONDS);
//
//        session.subscribe("/topic/" + team.getId(), new StompSessionHandlerAdapter() {
//            @Override
//            public void handleFrame(StompHeaders headers, Object payload) {
//                blockingQueue.offer(((TeamMsg) payload).getMsgContent());
//            }
//        });
//
//        session.send("/app/team/" + team.getId() + "/chat", new PostChatRequestDto("Hello, World!"));
//
//        String receivedMessage = blockingQueue.poll(5, TimeUnit.SECONDS);
//        assertEquals("Hello, World!", receivedMessage);
//    }
//
//    static class PostChatRequestDto {
//        private String msgContent;
//
//        public PostChatRequestDto(String msgContent) {
//            this.msgContent = msgContent;
//        }
//
//        public String getMsgContent() {
//            return msgContent;
//        }
//
//        public void setMsgContent(String msgContent) {
//            this.msgContent = msgContent;
//        }
//    }
//}
