package com.ssafy.sayif.member.exception;

public class MemberNotEqualException extends RuntimeException {

    public MemberNotEqualException(String username) {
        super("Member not equal with username: " + username);
    }
}
