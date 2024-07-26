package com.ssafy.sayif.member.exception;

public class MemberNotFoundException extends RuntimeException {

    public MemberNotFoundException(int memberId) {
        super("Member not found with ID: " + memberId);
    }
}
