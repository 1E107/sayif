package com.ssafy.sayif.team.exception;

public class TeamBoardNotFoundException extends RuntimeException {

    public TeamBoardNotFoundException(int boardId) {
        super("TeamBoard not found with ID: " + boardId);
    }
}
