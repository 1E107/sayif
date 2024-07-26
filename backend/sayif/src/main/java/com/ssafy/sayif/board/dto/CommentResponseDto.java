package com.ssafy.sayif.board.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CommentResponseDto {

    private int id;
    private String content;
    private String writer;
    private LocalDateTime createdAt;


}
