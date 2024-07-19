package com.ssafy.sayif.board.entity;

import com.ssafy.sayif.user.entity.Member;
import jakarta.persistence.*;

@Entity
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
}

