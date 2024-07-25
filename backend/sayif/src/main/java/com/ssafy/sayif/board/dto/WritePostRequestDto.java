package com.ssafy.sayif.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.sayif.board.entity.BoardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WritePostRequestDto {

    private String title;
    private String content;
    private String file;
    @JsonProperty("member_id")
    private int memberId;
    private BoardType type;
}
