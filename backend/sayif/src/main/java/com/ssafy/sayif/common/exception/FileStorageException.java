package com.ssafy.sayif.common.exception;

public class FileStorageException extends RuntimeException {

    // 기본 생성자
    public FileStorageException() {
        super();
    }

    // 메시지만 받는 생성자
    public FileStorageException(String message) {
        super(message);
    }

    // 원인만 받는 생성자
    public FileStorageException(Throwable cause) {
        super(cause);
    }

    // 메시지와 원인을 받는 생성자
    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
