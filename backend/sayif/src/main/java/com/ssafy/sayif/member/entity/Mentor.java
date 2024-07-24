package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;
import lombok.Getter;


@Entity
@Getter
public class Mentor {

    @Id
    @OneToOne
    @JoinColumn(name = "mentor_id")
    private Member member;

    @Column(length = 20)
    private String major;

    private int regCode;

    private int seq;

    @Column(columnDefinition = "TEXT")
    private String intro;

    @Enumerated(EnumType.STRING)
    private Track track;
}