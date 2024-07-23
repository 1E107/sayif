package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Mentee{

    @Id
    @OneToOne
    @JoinColumn(name = "mentee_id")
    private Member member;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Pending;

    @Column(columnDefinition = "TEXT")
    private String authFile;


}