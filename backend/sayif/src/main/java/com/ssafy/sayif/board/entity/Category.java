package com.ssafy.sayif.board.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class Category {

    @Id
    @OneToOne
    @JoinColumn(name = "board_id")
    private Board board;

    private Cat cat;

}
