package com.ssafy.sayif.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Mentee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menteeId;

    @Column(nullable = false)
    private LocalDateTime applyDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Pending;

    @Lob
    private String authFile;

    @OneToOne
    @JoinColumn(name = "mentee_id")
    private Member member;

}