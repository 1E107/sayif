package com.ssafy.sayif.team.exception;

public class TeamNotFoundException extends RuntimeException {

    public TeamNotFoundException(int teamId) {
        super("Team not found with ID: " + teamId);
    }
}
