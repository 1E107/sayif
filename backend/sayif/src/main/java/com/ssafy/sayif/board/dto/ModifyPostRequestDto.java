package com.ssafy.sayif.board.dto;

import com.ssafy.sayif.board.entity.BoardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModifyPostRequestDto {

    private String title;
    private String content;
    private String file;
    private BoardType type;
}