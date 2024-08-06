package com.ssafy.sayif.challenge.entity;

import com.ssafy.sayif.common.entity.BaseTimeEntity;
import com.ssafy.sayif.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDetail extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "file")
    private String file;

    public void updateFile(String file) {
        this.file = file;
    }
}
