package com.ssafy.sayif.domain.test.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TestController {
    @GetMapping("/api")
    public String dockerTest() {
        return "hello docker!";
    }

    @GetMapping("/api/abc")
    public String abctest() {
        return "hello abc!";
    }
}
