package com.ssafy.sayif.team.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class TeamBoardCommentResponseDto {

    private int id;
    private int teamBoardId;
    private String username;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
