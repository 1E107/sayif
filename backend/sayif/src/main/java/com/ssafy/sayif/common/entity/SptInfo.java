package com.ssafy.sayif.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class SptInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "ranged")
    private String ranged;

    @Column(name = "region")
    private String region;

    @Column(name = "recruit_start")
    private LocalDateTime recruitStart;

    @Column(name = "recruit_end")
    private LocalDateTime recruitEnd;

    @Column(name = "hit_count")
    private Integer hitCount;

    @Column(name = "method")
    private String method;

    @Column(name = "img")
    private String img;
}
