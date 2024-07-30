package com.ssafy.sayif.member.dto;

import lombok.Data;

import java.util.List;

@Data
public class TagRequestDto {
    private List<String> contents;
}
