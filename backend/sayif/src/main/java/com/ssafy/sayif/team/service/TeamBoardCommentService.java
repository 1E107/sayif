package com.ssafy.sayif.team.service;

import com.ssafy.sayif.board.exception.CommentNotFoundException;
import com.ssafy.sayif.member.exception.UnauthorizedAccessException;
import com.ssafy.sayif.team.converter.TeamBoardCommentConverter;
import com.ssafy.sayif.team.dto.TeamBoardCommentRequestDto;
import com.ssafy.sayif.team.dto.TeamBoardCommentResponseDto;
import com.ssafy.sayif.team.entity.QnaAnswer;
import com.ssafy.sayif.team.repository.TeamBoardCommentRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 댓글과 관련된 비즈니스 로직을 처리하는 서비스 클래스입니다. 댓글의 작성, 수정, 삭제, 조회 기능을 제공하며, 댓글 작성자는 댓글의 작성자만이 수정 및 삭제를 할 수 있도록
 * 권한을 검증합니다.
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TeamBoardCommentService {

    private final TeamBoardCommentRepository teamBoardCommentRepository;
    private final TeamBoardCommentConverter teamBoardCommentConverter;

    /**
     * 주어진 ID로 댓글을 조회합니다.
     *
     * @param commentId 조회할 댓글의 ID
     * @return 댓글 엔티티
     * @throws CommentNotFoundException 댓글이 존재하지 않을 경우 예외를 던집니다.
     */
    private QnaAnswer findCommentById(int commentId) {
        return teamBoardCommentRepository.findById(commentId)
            .orElseThrow(() -> new CommentNotFoundException(commentId));
    }

    /**
     * 댓글 작성자가 현재 사용자가 맞는지 확인합니다.
     *
     * @param comment  조회한 댓글
     * @param memberId 현재 사용자 ID
     * @return 현재 사용자가 댓글 작성자인 경우 false, 그렇지 않으면 true
     */
    private boolean isAuthorizedUser(QnaAnswer comment, String memberId) {
        return !memberId.equals(comment.getMember().getUsername());
    }

    /**
     * 댓글의 내용을 수정하고 저장합니다.
     *
     * @param comment 댓글 엔티티
     * @param content 새로운 댓글 내용
     * @return 수정된 댓글 엔티티
     */
    private QnaAnswer updateCommentContent(QnaAnswer comment, String content) {
        QnaAnswer updatedComment = comment.toBuilder()
            .answer(content)
            .modifiedAt(LocalDateTime.now())
            .build();
        teamBoardCommentRepository.save(updatedComment);
        return updatedComment;
    }

    /**
     * 댓글 엔티티를 DTO로 변환합니다.
     *
     * @param comment 변환할 댓글 엔티티
     * @return 변환된 댓글 DTO
     */
    private TeamBoardCommentResponseDto convertToDto(QnaAnswer comment) {
        return TeamBoardCommentResponseDto.builder()
            .id(comment.getId())
            .content(comment.getAnswer())
            .createdAt(comment.getCreatedAt())
            .username(comment.getMember().getUsername())
            .modifiedAt(comment.getModifiedAt())
            .build();
    }

    /**
     * 새로운 댓글을 작성합니다.
     *
     * @param dto 댓글 작성 요청을 담고 있는 DTO
     */
    public void writeComment(TeamBoardCommentRequestDto dto) {
        QnaAnswer comment = teamBoardCommentConverter.convertToEntity(dto);
        teamBoardCommentRepository.save(comment);
    }

    /**
     * 기존 댓글을 수정합니다.
     *
     * @param commentId 수정할 댓글의 ID
     * @param memberId  댓글 작성자의 ID
     * @param dto       댓글 수정 요청을 담고 있는 DTO
     * @return 수정된 댓글 엔티티
     * @throws UnauthorizedAccessException 댓글 작성자가 현재 사용자가 아닌 경우 예외를 던집니다.
     * @throws CommentNotFoundException    해당 ID의 댓글이 존재하지 않을 경우 예외를 던집니다.
     */
    public QnaAnswer modifyComment(int commentId, String memberId,
        TeamBoardCommentRequestDto dto) {
        QnaAnswer comment = findCommentById(commentId);

        if (isAuthorizedUser(comment, memberId)) {
            throw new UnauthorizedAccessException("Invalid member ID");
        }

        return updateCommentContent(comment, dto.getContent());
    }

    /**
     * 댓글을 삭제합니다.
     *
     * @param commentId 삭제할 댓글의 ID
     * @param memberId  댓글 작성자의 ID
     * @throws UnauthorizedAccessException 댓글 작성자가 현재 사용자가 아닌 경우 예외를 던집니다.
     * @throws CommentNotFoundException    해당 ID의 댓글이 존재하지 않을 경우 예외를 던집니다.
     */
    public void deleteComment(int commentId, String memberId) {
        QnaAnswer comment = findCommentById(commentId);

        if (isAuthorizedUser(comment, memberId)) {
            throw new UnauthorizedAccessException("Invalid member ID");
        }

        teamBoardCommentRepository.delete(comment);
    }

    /**
     * 특정 게시글에 대한 댓글 목록을 조회합니다.
     *
     * @param boardId 댓글이 포함된 게시글의 ID
     * @return 게시글에 대한 모든 댓글의 DTO 리스트
     */
    public List<TeamBoardCommentResponseDto> getCommentList(int boardId) {
        List<QnaAnswer> comments = teamBoardCommentRepository.findAll();
        return comments.stream()
            .filter(comment -> comment.getTeamBoard().getId() == boardId)
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
}
