package com.ssafy.sayif.board.exception;

public class BoardNotFoundException extends RuntimeException {

    public BoardNotFoundException(int id) {
        super("Board not found with ID: " + id);
    }
}
