package com.ssafy.sayif.user.entity;

import com.ssafy.sayif.team.entity.Team;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "ROLE")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userId;
    private String pwd;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private String gender;

    private String profileImg;

    @OneToOne
    private Team teamId;
}
