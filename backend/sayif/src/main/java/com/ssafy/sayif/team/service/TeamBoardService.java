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
     * 새로운 팀 게시글을 작성합니다.
     *
     * @param username 게시글을 작성하는 사용자의 사용자명
     * @param teamId   게시글을 작성할 팀의 ID
     * @param dto      게시글 요청 DTO
     * @return 작성된 팀 게시글 응답 DTO
     */
    public TeamPostResponseDto writeTeamPost(String username, int teamId, TeamPostRequestDto dto) {
        log.info("사용자: {}가 팀 ID: {}에 새 게시글 작성 중", username, teamId);
        Member member = findMemberByUsername(username);
        Team team = findTeamById(teamId);

        TeamBoard teamBoard = teamBoardRepository.save(TeamBoard.builder()
            .member(member)
            .team(team)
            .title(dto.getTitle())
            .content(dto.getContent())
            .build());

        log.info("사용자: {}가 팀 ID: {}에 게시글 작성 완료", username, teamId);
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
        log.info("사용자: {}가 팀 게시글 ID: {} 수정 중", username, teamBoardId);

        Member member = findMemberByUsername(username);
        TeamBoard teamBoard = findTeamBoardById(teamBoardId);

        verifyMemberIsAuthor(member, teamBoard);

        teamBoard.update(dto.getTitle(), dto.getContent());
        teamBoardRepository.save(teamBoard);

        log.info("사용자: {}가 팀 게시글 ID: {} 수정 완료", username, teamBoardId);
        return this.convertToDto(teamBoard);
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
        log.info("사용자: {}가 팀 게시글 ID: {} 삭제 중", username, teamBoardId);
        Member member = findMemberByUsername(username);
        TeamBoard teamBoard = findTeamBoardById(teamBoardId);

        verifyMemberIsAuthor(member, teamBoard);

        teamBoardRepository.delete(teamBoard);
        log.info("사용자: {}가 팀 게시글 ID: {} 삭제 완료", username, teamBoardId);
        return true;
    }

    /**
     * 팀 게시글 목록을 페이지네이션하여 가져옵니다.
     *
     * @param teamId 팀의 ID
     * @param page   가져올 페이지 번호
     * @param size   페이지 크기
     * @param key    검색할 키
     * @param word   검색할 단어
     * @return 팀 게시글 응답 DTO 목록
     */
    public List<TeamPostResponseDto> getTeamPostList(int teamId, int page, int size, String key,
        String word) {
        log.info("팀 ID: {}의 게시글 목록을 페이지: {}, 크기: {}, 키워드: {}로 가져옵니다.", teamId, page, size, word);
        Team team = findTeamById(teamId);
        Pageable pageable = PageRequest.of(page, size);
        Page<TeamBoard> teamBoardPage = switch (key) {
            case "content" -> teamBoardRepository.findAllByTeamAndContentContaining(pageable,
                team, word);
            case "title" -> teamBoardRepository.findAllByTeamAndTitleContaining(pageable, team,
                word);
            default -> teamBoardRepository.findAllByTeam(pageable, team);
        };

        List<TeamPostResponseDto> result = teamBoardPage.getContent().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());

        log.info("팀 ID: {}의 게시글 목록을 성공적으로 가져왔습니다.", teamId);
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
        log.info("팀 게시글 ID: {}의 상세 정보를 가져오는 중", teamBoardId);
        return teamBoardRepository.findById(teamBoardId)
            .map(this::convertToDto)
            .orElseThrow(() -> {
                log.error("해당 팀 게시글 ID로 게시글을 찾을 수 없음: {}", teamBoardId);
                return new TeamBoardNotFoundException(teamBoardId);
            });
    }

    /**
     * 사용자명으로 회원을 찾습니다.
     *
     * @param username 찾고자 하는 사용자의 사용자명
     * @return 찾은 회원 엔티티
     * @throws MemberNotFoundException 주어진 사용자명으로 사용자를 찾을 수 없는 경우
     */
    private Member findMemberByUsername(String username) {
        log.info("사용자명으로 회원 찾기: {}", username);
        return Optional.ofNullable(memberRepository.findByUsername(username))
            .orElseThrow(() -> {
                log.error("해당 사용자명으로 회원을 찾을 수 없음: {}", username);
                return new MemberNotFoundException(username);
            });
    }

    /**
     * 팀 ID로 팀을 찾습니다.
     *
     * @param teamId 찾고자 하는 팀의 ID
     * @return 찾은 팀 엔티티
     * @throws TeamNotFoundException 주어진 팀 ID로 팀을 찾을 수 없는 경우
     */
    private Team findTeamById(int teamId) {
        log.info("팀 ID로 팀 찾기: {}", teamId);
        return teamRepository.findById(teamId).orElseThrow(() -> {
            log.error("해당 팀 ID로 팀을 찾을 수 없음: {}", teamId);
            return new TeamNotFoundException(teamId);
        });
    }

    /**
     * TeamBoard 엔티티를 TeamPostResponseDto로 변환합니다.
     *
     * @param teamBoard 변환할 TeamBoard 엔티티
     * @return 변환된 TeamPostResponseDto
     */
    private TeamPostResponseDto convertToDto(TeamBoard teamBoard) {
        log.debug("TeamBoard를 TeamPostResponseDto로 변환 중");
        return TeamPostResponseDto.builder()
            .id(teamBoard.getId())
            .title(teamBoard.getTitle())
            .content(teamBoard.getContent())
            .writer(teamBoard.getMember().getUsername())
            .createdAt(teamBoard.getCreatedAt())
            .modifiedAt(teamBoard.getModifiedAt())
            .build();
    }

    /**
     * 팀 게시글 ID로 TeamBoard 엔티티를 찾습니다.
     *
     * @param teamBoardId 찾고자 하는 팀 게시글의 ID
     * @return 찾은 TeamBoard 엔티티
     * @throws TeamBoardNotFoundException 주어진 ID로 팀 게시글을 찾을 수 없는 경우
     */
    private TeamBoard findTeamBoardById(int teamBoardId) {
        log.info("팀 게시글 ID로 TeamBoard 찾기: {}", teamBoardId);
        return teamBoardRepository.findById(teamBoardId).orElseThrow(() -> {
            log.error("해당 팀 게시글 ID로 TeamBoard를 찾을 수 없음: {}", teamBoardId);
            return new TeamBoardNotFoundException(teamBoardId);
        });
    }

    /**
     * 주어진 회원이 팀 게시글의 작성자인지 확인합니다.
     *
     * @param member    확인할 회원 엔티티
     * @param teamBoard 확인할 팀 게시글 엔티티
     * @throws MemberNotEqualException 회원이 작성자가 아닌 경우
     */
    private void verifyMemberIsAuthor(Member member, TeamBoard teamBoard) {
        if (!teamBoard.getMember().equals(member)) {
            log.warn("사용자: {}는 팀 게시글 ID: {}의 작성자가 아닙니다.", member.getUsername(), teamBoard.getId());
            throw new MemberNotEqualException(member.getUsername());
        }
    }
}
