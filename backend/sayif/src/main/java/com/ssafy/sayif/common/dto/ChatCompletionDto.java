package com.ssafy.sayif.common.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatCompletionDto {

    private String model;
    private List<ChatRequestMsgDto> messages;

}
