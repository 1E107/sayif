package com.ssafy.sayif.team.service;

import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.exception.MemberNotEqualException;
import com.ssafy.sayif.member.exception.MemberNotFoundException;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.team.dto.TeamPostRequestDto;
import com.ssafy.sayif.team.dto.TeamPostResponseDto;
import com.ssafy.sayif.team.entity.Team;
import com.ssafy.sayif.team.entity.TeamBoard;
import com.ssafy.sayif.team.exception.TeamBoardNotFoundException;
import com.ssafy.sayif.team.exception.TeamNotFoundException;
import com.ssafy.sayif.team.repository.TeamBoardRepository;
import com.ssafy.sayif.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamBoardService {

    private final TeamRepository teamRepository;
    private final TeamBoardRepository teamBoardRepository;
    private final MemberRepository memberRepository;

    /**
     * 사용자명으로 Member 를 찾습니다.
     *
     * @param username 찾고자 하는 사용자의 사용자명
     * @return 찾은 Member 엔티티
     * @throws MemberNotFoundException 주어진 사용자명으로 사용자를 찾을 수 없는 경우
     */
    private Member findMemberByUsername(String username) {
        return Optional.ofNullable(memberRepository.findByUsername(username))
            .orElseThrow(
                () -> new MemberNotFoundException(username));
    }

    /**
     * 사용자명으로 Member 를 찾습니다.
     *
     * @param teamId 찾고자 하는 팀의 Id
     * @return 찾은 Team 엔티티
     * @throws TeamNotFoundException 주어진 팀Id로 팀을 찾을 수 없는 경우
     */
    private Team findTeamById(int teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
    }

    private TeamPostResponseDto convertToDto(TeamBoard teamBoard) {
        return TeamPostResponseDto.builder()
            .title(teamBoard.getTitle())
            .content(teamBoard.getContent())
            .writer(teamBoard.getMember().getUsername())
            .build();
    }

    public TeamPostResponseDto writeTeamPost(String username, int teamId,
        TeamPostRequestDto dto) {
        Member member = findMemberByUsername(username);
        Team team = findTeamById(teamId);

        TeamBoard teamBoard = teamBoardRepository.save(TeamBoard.builder()
            .member(member)
            .team(team)
            .title(dto.getTitle())
            .content(dto.getContent()).build());

        return this.convertToDto(teamBoard);
    }

    public TeamPostResponseDto modifyTeamPost(String username, int boardId,
        TeamPostRequestDto dto) {
        Member member = findMemberByUsername(username);

        TeamBoard teamBoard = teamBoardRepository.findById(boardId)
            .orElseThrow(() -> new TeamBoardNotFoundException(boardId));

        if (!teamBoard.getMember().equals(member)) {
            throw new MemberNotEqualException(member.getUsername());
        }

        TeamBoard modifiedTeamBoard = teamBoardRepository.save(
            teamBoard.toBuilder().title(dto.getTitle()).content(dto.getContent()).build());

        return this.convertToDto(modifiedTeamBoard);
    }

    public boolean removeTeamPost(int boardId, String username) {
        Member member = findMemberByUsername(username);
        TeamBoard teamBoard = teamBoardRepository.findById(boardId)
            .orElseThrow(() -> new TeamBoardNotFoundException(boardId));

        if (!teamBoard.getMember().equals(member)) {
            throw new MemberNotEqualException(member.getUsername());
        }

        teamBoardRepository.delete(teamBoard);
        return true;
    }

    public List<TeamPostResponseDto> getTeamPostList(int teamId, int page, int size) {
        Team team = findTeamById(teamId);
        Pageable pageable = PageRequest.of(page, size);
        Page<TeamBoard> teamBoardPage = teamBoardRepository.findAllByTeam(pageable, team);

        return teamBoardPage.getContent().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public Object getTeamPostDetail(int id) {
    }


}
