package com.ssafy.sayif.board.entity;

import com.ssafy.sayif.user.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @Lob
    private String content;

    private LocalDateTime createAt;

    private LocalDateTime editedAt;

}