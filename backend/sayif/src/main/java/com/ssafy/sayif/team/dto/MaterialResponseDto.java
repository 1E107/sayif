package com.ssafy.sayif.team.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MaterialResponseDto {

    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer hit;
    private String file;
    private String fileUrl;
    private Integer chapter;
}