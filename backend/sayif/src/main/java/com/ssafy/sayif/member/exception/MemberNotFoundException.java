package com.ssafy.sayif.member.exception;

public class MemberNotFoundException extends RuntimeException {

    public MemberNotFoundException(String username) {
        super("Member not found with ID: " + username);
    }
}
