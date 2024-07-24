package com.ssafy.sayif.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.Getter;

@Entity
@Getter
public class Mentee {

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