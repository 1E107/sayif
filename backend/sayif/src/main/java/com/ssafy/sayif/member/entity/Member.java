package com.ssafy.sayif.member.entity;

import com.ssafy.sayif.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String memberId;
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private String gender;
    private String profileImg;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
