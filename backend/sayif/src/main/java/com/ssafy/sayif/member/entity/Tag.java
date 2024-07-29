package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Tag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private boolean isRemove;

    public void createTag(Member member, String content) {
        this.member = member;
        this.content = content;
        isRemove = false;
    }

    public void setRemove(boolean isRemove) {
        this.isRemove = isRemove;
    }
}

