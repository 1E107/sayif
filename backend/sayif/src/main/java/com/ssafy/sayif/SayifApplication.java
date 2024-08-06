package com.ssafy.sayif;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class SayifApplication {

    public static void main(String[] args) {
        SpringApplication.run(SayifApplication.class, args);
    }


}
