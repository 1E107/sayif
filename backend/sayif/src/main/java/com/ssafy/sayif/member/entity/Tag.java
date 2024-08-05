package com.ssafy.sayif.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    private boolean isRemove;

    public void createTag(Mentor mentor, String content) {
        this.mentor = mentor;
        this.content = content;
        isRemove = false;
    }

    public void setRemove(boolean isRemove) {
        this.isRemove = isRemove;
    }
}

