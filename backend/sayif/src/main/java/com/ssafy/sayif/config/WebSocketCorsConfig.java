package com.ssafy.sayif.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSocketCorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/openvidu/**")
                .allowedOrigins("http://localhost:3000", "http://i11e107.p.ssafy.io:3000", "https://i11e107.p.ssafy.io")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
