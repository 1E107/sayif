package com.ssafy.sayif.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("MENTEE")
public class Mentee extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer menteeId;

    @Column(name = "apply_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime applyDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MenteeStatus status = MenteeStatus.Pending;

    @Column(name = "auth_file")
    private String authFile;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

}
