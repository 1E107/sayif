package com.ssafy.sayif.member.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@SuperBuilder
@PrimaryKeyJoinColumn(name = "mentee_id")
@NoArgsConstructor
@AllArgsConstructor
public class Mentee extends Member {

    @Column
    private LocalDateTime applyDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String authFile;

}
