package com.ssafy.sayif.team.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MaterialResponseDto {
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer hit;
    private String file;
    private Integer chapter;
}