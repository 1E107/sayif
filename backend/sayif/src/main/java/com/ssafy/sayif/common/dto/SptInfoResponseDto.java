package com.ssafy.sayif.common.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SptInfoResponseDto {

    private Integer id;
    private String title;
    private String ranged;
    private String region;
    private LocalDateTime recruitStart;
    private LocalDateTime recruitEnd;
    private Integer hitCount;
    private String method;
    private String fileUrl;
}
