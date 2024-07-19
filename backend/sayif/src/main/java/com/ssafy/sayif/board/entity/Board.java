package com.ssafy.sayif.board.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int userId;

    @Lob
    private String title;

    @Lob
    private String content;

    private LocalDateTime createAt;

    private LocalDateTime editedAt;

    private int hitCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private BoardType type;

    @Column(name = "file", length = 255)
    private String file;

    @Column(name = "is_remove")
    private Boolean isRemove;

    @Column(name = "remove_at")
    private LocalDateTime removeAt;

}