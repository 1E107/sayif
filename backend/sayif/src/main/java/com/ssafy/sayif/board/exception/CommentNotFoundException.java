package com.ssafy.sayif.board.exception;

public class CommentNotFoundException extends RuntimeException {

    public CommentNotFoundException(int commentId) {
        super("Comment not found with ID: " + commentId);
    }
}
