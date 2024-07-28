package com.ssafy.sayif.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CommentRequestDto {

    private String content;
    private String memberId;
    private int boardId;

}
