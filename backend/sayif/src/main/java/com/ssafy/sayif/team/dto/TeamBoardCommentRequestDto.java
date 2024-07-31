package com.ssafy.sayif.team.dto;

import lombok.Data;


@Data
public class TeamBoardCommentRequestDto {

    private int id;
    private int teamBoardId;
    private String username;
    private String content;

}
