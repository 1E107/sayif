package com.ssafy.sayif.team.controller;

import com.ssafy.sayif.team.dto.RecruitRequestDto;
import com.ssafy.sayif.team.dto.SearchRequestDto;
import com.ssafy.sayif.team.dto.SearchResponseDto;
import com.ssafy.sayif.team.service.MentoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/mentoring")
public class MentoringController {

    @Autowired
    MentoringService mentoringService;


    @PostMapping("/recruit")
    public ResponseEntity<?> recruit(@RequestBody RecruitRequestDto recruitRequestDto){
        int res = mentoringService.recruit(recruitRequestDto);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/search/{page_no}/{size_no}")
    public ResponseEntity<?> search(@RequestBody SearchRequestDto searchRequestDto, @PathVariable int page_no, @PathVariable int size_no){
        List<SearchResponseDto> mentoList = mentoringService.search(searchRequestDto);
        return ResponseEntity.ok(mentoList);
    }

}
