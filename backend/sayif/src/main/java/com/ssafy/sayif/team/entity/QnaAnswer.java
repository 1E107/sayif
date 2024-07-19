package com.ssafy.sayif.team.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class QnaAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "qna_board_id", nullable = false)
    private Integer qnaBoardId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "answer")
    private String answer;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "edited_at")
    private Timestamp editedAt;

}

