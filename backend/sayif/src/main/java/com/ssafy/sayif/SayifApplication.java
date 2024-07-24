package com.ssafy.sayif;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.ssafy.sayif")
public class SayifApplication {

	public static void main(String[] args) {
		SpringApplication.run(SayifApplication.class, args);
	}

}
