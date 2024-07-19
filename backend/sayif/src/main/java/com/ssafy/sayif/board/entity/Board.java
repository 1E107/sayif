package com.ssafy.sayif.board.entity;

import com.ssafy.sayif.common.entity.BaseTimeEntity;
import com.ssafy.sayif.user.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
public class Board extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

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