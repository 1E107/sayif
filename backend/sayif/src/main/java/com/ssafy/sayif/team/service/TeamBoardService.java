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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
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
        log.info("Finding member by username: {}", username);
        return Optional.ofNullable(memberRepository.findByUsername(username))
            .orElseThrow(() -> {
                log.error("Member not found with username: {}", username);
                return new MemberNotFoundException(username);
            });
    }

    /**
     * 팀 ID로 Team 을 찾습니다.
     *
     * @param teamId 찾고자 하는 팀의 ID
     * @return 찾은 Team 엔티티
     * @throws TeamNotFoundException 주어진 팀 ID로 팀을 찾을 수 없는 경우
     */
    private Team findTeamById(int teamId) {
        log.info("Finding team by ID: {}", teamId);
        return teamRepository.findById(teamId).orElseThrow(() -> {
            log.error("Team not found with ID: {}", teamId);
            return new TeamNotFoundException(teamId);
        });
    }

    /**
     * TeamBoard 엔티티를 TeamPostResponseDto 로 변환합니다.
     *
     * @param teamBoard 변환할 TeamBoard 엔티티
     * @return 변환된 TeamPostResponseDto
     */
    private TeamPostResponseDto convertToDto(TeamBoard teamBoard) {
        log.debug("Converting TeamBoard to TeamPostResponseDto");
        return TeamPostResponseDto.builder()
            .title(teamBoard.getTitle())
            .content(teamBoard.getContent())
            .writer(teamBoard.getMember().getUsername())
            .build();
    }

    /**
     * 새로운 팀 게시글을 작성합니다.
     *
     * @param username 게시글을 작성하는 사용자의 사용자명
     * @param teamId   게시글을 작성할 팀의 ID
     * @param dto      게시글 요청 DTO
     * @return 작성된 팀 게시글 응답 DTO
     */
    public TeamPostResponseDto writeTeamPost(String username, int teamId, TeamPostRequestDto dto) {
        log.info("Writing team post by user: {} for team ID: {}", username, teamId);
        Member member = findMemberByUsername(username);
        Team team = findTeamById(teamId);

        TeamBoard teamBoard = teamBoardRepository.save(TeamBoard.builder()
            .member(member)
            .team(team)
            .title(dto.getTitle())
            .content(dto.getContent())
            .build());

        log.info("Team post successfully written by user: {} for team ID: {}", username, teamId);
        return this.convertToDto(teamBoard);
    }

    /**
     * 기존 팀 게시글을 수정합니다.
     *
     * @param username    게시글을 수정하는 사용자의 사용자명
     * @param teamBoardId 수정할 팀 게시글의 ID
     * @param dto         게시글 요청 DTO
     * @return 수정된 팀 게시글 응답 DTO
     * @throws MemberNotEqualException 게시글 작성자와 사용자가 일치하지 않는 경우
     */
    public TeamPostResponseDto modifyTeamPost(String username, int teamBoardId,
        TeamPostRequestDto dto) {
        log.info("Modifying team post ID: {} by user: {}", teamBoardId, username);

        // 사용자를 찾고, 팀 게시판 글을 찾습니다.
        Member member = findMemberByUsername(username);

        TeamBoard teamBoard = teamBoardRepository.findById(teamBoardId)
            .orElseThrow(() -> {
                log.error("TeamBoard not found with ID: {}", teamBoardId);
                return new TeamBoardNotFoundException(teamBoardId);
            });

        // 작성자 확인
        if (!teamBoard.getMember().equals(member)) {
            log.warn("User: {} is not the author of TeamBoard ID: {}", username, teamBoardId);
            throw new MemberNotEqualException(member.getUsername());
        }

        // 수정된 엔티티를 저장
        TeamBoard modifiedTeamBoard = teamBoard.toBuilder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .modifiedAt(LocalDateTime.now()).build();

        teamBoardRepository.save(modifiedTeamBoard);

        log.info("Team post ID: {} successfully modified by user: {}", teamBoardId, username);
        return this.convertToDto(modifiedTeamBoard);
    }


    /**
     * 기존 팀 게시글을 삭제합니다.
     *
     * @param teamBoardId 삭제할 팀 게시글의 ID
     * @param username    게시글을 삭제하는 사용자의 사용자명
     * @return 게시글이 성공적으로 삭제된 경우 true
     * @throws MemberNotEqualException 게시글 작성자와 사용자가 일치하지 않는 경우
     */
    public boolean removeTeamPost(int teamBoardId, String username) {
        log.info("Removing team post ID: {} by user: {}", teamBoardId, username);
        Member member = findMemberByUsername(username);
        TeamBoard teamBoard = teamBoardRepository.findById(teamBoardId)
            .orElseThrow(() -> {
                log.error("TeamBoard not found with ID: {}", teamBoardId);
                return new TeamBoardNotFoundException(teamBoardId);
            });

        if (!teamBoard.getMember().equals(member)) {
            log.warn("User: {} is not the author of TeamBoard ID: {}", username, teamBoardId);
            throw new MemberNotEqualException(member.getUsername());
        }

        teamBoardRepository.delete(teamBoard);
        log.info("Team post ID: {} successfully removed by user: {}", teamBoardId, username);
        return true;
    }

    /**
     * 팀 게시글 목록을 페이지네이션하여 가져옵니다.
     *
     * @param teamId 팀의 ID
     * @param page   가져올 페이지 번호
     * @param size   페이지 크기
     * @return 팀 게시글 응답 DTO 목록
     */
    public List<TeamPostResponseDto> getTeamPostList(int teamId, int page, int size) {
        log.info("Getting team post list for team ID: {} with page: {} and size: {}", teamId, page,
            size);
        Team team = findTeamById(teamId);
        Pageable pageable = PageRequest.of(page, size);
        Page<TeamBoard> teamBoardPage = teamBoardRepository.findAllByTeam(pageable, team);

        List<TeamPostResponseDto> result = teamBoardPage.getContent().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());

        log.info("Successfully retrieved team post list for team ID: {}", teamId);
        return result;
    }

    /**
     * 특정 팀 게시글의 상세 정보를 가져옵니다.
     *
     * @param teamBoardId 팀 게시글의 ID
     * @return 팀 게시글 응답 DTO
     * @throws TeamBoardNotFoundException 주어진 ID로 팀 게시글을 찾을 수 없는 경우
     */
    public TeamPostResponseDto getTeamPostDetail(int teamBoardId) {
        log.info("Getting team post detail for ID: {}", teamBoardId);
        return teamBoardRepository.findById(teamBoardId)
            .map(this::convertToDto)
            .orElseThrow(() -> {
                log.error("TeamBoard not found with ID: {}", teamBoardId);
                return new TeamBoardNotFoundException(teamBoardId);
            });
    }
}
