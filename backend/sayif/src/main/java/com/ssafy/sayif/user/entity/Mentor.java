package com.ssafy.sayif.user.entity;

import jakarta.persistence.*;
import lombok.Getter;


@Entity
@Getter
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mentorId;

    @Column(length = 20)
    private String major;

    private int regCode;

    private int seq;

    @Lob
    private String intro;

    @Enumerated(EnumType.STRING)
    private Track track;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

}