package com.ssafy.sayif.team.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @Column(name = "point")
    private Integer point;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "mentoring_time", columnDefinition = "TIME")
    private LocalTime mentoringTime;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TeamStatus status;

    @Column(name = "session_id")
    private String sessionId;

    public void updateStatus(TeamStatus newStatus) {
        this.status = newStatus;
    }

    public void updateSessionId(String newSessionId) {
        this.sessionId = newSessionId;
    }

    public void updatePoint(Integer newPoint) {
        this.point += newPoint;
    }

    public void changeName(String newName) {
        this.name = newName;
    }

    public void registerName(String newName) {
        this.name = newName;
    }
}