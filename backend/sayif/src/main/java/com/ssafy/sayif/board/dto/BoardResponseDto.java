package com.ssafy.sayif.board.dto;

import com.ssafy.sayif.board.entity.BoardType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponseDto {

    private int id;
    private String title;
    private String content;
    private String file;
    private String writer;
    private BoardType type;
    private int hitCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private boolean isRemove;

}