package com.ssafy.sayif.team.converter;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.dto.TeamBoardCommentRequestDto;
import com.ssafy.sayif.team.entity.QnaAnswer;
import com.ssafy.sayif.team.entity.TeamBoard;
import com.ssafy.sayif.team.repository.TeamBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeamBoardCommentConverter {


    private final MemberRepository memberRepository;
    private final TeamBoardRepository teamBoardRepository;

    private record Result(TeamBoard teamBoard, Member member) {

    }

    private TeamBoardCommentConverter.Result getResult(TeamBoardCommentRequestDto dto) {
        TeamBoard teamBoard = teamBoardRepository.findById(dto.getTeamBoardId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));
        Member member = memberRepository.findByUsername(dto.getUsername());
        if (member == null) {
            throw new IllegalArgumentException("Invalid member ID");
        }
        return new TeamBoardCommentConverter.Result(teamBoard, member);
    }


    public QnaAnswer convertToEntity(TeamBoardCommentRequestDto dto) {
        TeamBoardCommentConverter.Result result = getResult(dto);
        return QnaAnswer.builder()
            .member(result.member())
            .teamBoard(result.teamBoard())
            .answer(dto.getContent())
            .build();
    }
}
