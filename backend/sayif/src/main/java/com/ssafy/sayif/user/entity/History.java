package com.ssafy.sayif.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class History {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

//    @ManyToOne
//    @JoinColumn(name = "mt_id")
//    private Team team;

    @Lob
    private String review;
}
