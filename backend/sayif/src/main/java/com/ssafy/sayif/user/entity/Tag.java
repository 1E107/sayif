package com.ssafy.sayif.user.entity;

import jakarta.persistence.*;

@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 40)
    private String content;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    private Boolean field;
}
