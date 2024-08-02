package com.ssafy.sayif.config;

import com.ssafy.sayif.member.jwt.JWTUtil;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class FilterChannelInterceptor implements ChannelInterceptor {

    private final JWTUtil jwtUtil;

    public FilterChannelInterceptor(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        assert headerAccessor != null;
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            String authorizationHeader = headerAccessor.getFirstNativeHeader("Authorization");
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
                try {
                    if (!jwtUtil.isExpired(token)) {
                        String username = jwtUtil.getUsername(token);

                        // 사용자 정보를 헤더에 추가
                        headerAccessor.addNativeHeader("User", username);
                    } else {
                        throw new RuntimeException("Expired token");
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Invalid token", e);
                }
            } else {
                throw new RuntimeException("Missing Authorization header");
            }
        }
        return message;
    }
}