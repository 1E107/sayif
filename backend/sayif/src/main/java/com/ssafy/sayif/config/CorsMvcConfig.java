package com.ssafy.sayif.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://i11e107.p.ssafy.io")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*") //클라이언트 측의 CORS 요청에 허용되는 헤더 지정
                .exposedHeaders("access") // 클라이언트가 응답에 접근할 수 있는 헤더 지정
                .allowCredentials(true);
    }
}
