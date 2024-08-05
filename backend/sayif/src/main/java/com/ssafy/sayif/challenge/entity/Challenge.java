package com.ssafy.sayif.challenge.entity;

import com.ssafy.sayif.team.entity.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "challenge_num")
    private ChallengeList challengeList;

    @Enumerated(EnumType.STRING)
    private ChallengeStatus status;
}
