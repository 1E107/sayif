package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.*;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "mentee_id")
public class Mentee extends Member{

//    @Id
//    @OneToOne
//    @JoinColumn(name = "mentee_id")
//    private Member member;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Pending;

    @Column(columnDefinition = "TEXT")
    private String authFile;

}