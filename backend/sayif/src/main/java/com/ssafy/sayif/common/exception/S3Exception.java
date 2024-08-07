package com.ssafy.sayif.common.exception;

public class S3Exception extends RuntimeException {

    public S3Exception(ErrorCode code) {
        super(code.toString());
    }
}
