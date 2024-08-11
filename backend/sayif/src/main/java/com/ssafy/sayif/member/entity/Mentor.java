package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Entity
@Getter
@SuperBuilder(toBuilder = true)
@PrimaryKeyJoinColumn(name = "mentor_id")
@NoArgsConstructor
@AllArgsConstructor
public class Mentor extends Member {

    @Column(length = 20)
    private String major;

    private int regCode;

    private int seq;

    @Column(columnDefinition = "TEXT")
    private String intro;

    @Enumerated(EnumType.STRING)
    private Track track;

    @OneToMany(mappedBy = "mentor", fetch = FetchType.LAZY)
    private List<Tag> tags;

    // Setter method for intro
    public void setIntro(String intro) {
        this.intro = intro;
    }
}