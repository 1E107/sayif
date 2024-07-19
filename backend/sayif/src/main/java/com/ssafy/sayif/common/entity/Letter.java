package com.ssafy.sayif.common.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Letter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String title;

    @Lob
    private String content;

    @Column(nullable = false)
    private int sendId;

    @Column(nullable = false)
    private int receiveId;

    private LocalDateTime createAt;

}