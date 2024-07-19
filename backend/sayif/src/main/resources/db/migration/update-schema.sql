CREATE TABLE local.material
(
    id      INT NOT NULL,
    chapter INT NULL,
    file    VARCHAR(255) NULL,
    mt_id   INT NOT NULL,
    CONSTRAINT pk_material PRIMARY KEY (id)
);

CREATE TABLE local.qna_answer
(
    id           INT NOT NULL,
    qna_board_id INT NOT NULL,
    user_id      INT NOT NULL,
    answer       VARCHAR(255) NULL,
    created_at   datetime NULL,
    edited_at    datetime NULL,
    CONSTRAINT pk_qnaanswer PRIMARY KEY (id)
);

CREATE TABLE local.quiz
(
    id       INT AUTO_INCREMENT NOT NULL,
    chapter  INT NULL,
    question VARCHAR(255) NULL,
    CONSTRAINT pk_quiz PRIMARY KEY (id)
);

CREATE TABLE local.quiz_choice
(
    id        INT NOT NULL,
    quiz_id   INT NOT NULL,
    content   VARCHAR(255) NULL,
    is_answer BIT(1) NULL,
    CONSTRAINT pk_quizchoice PRIMARY KEY (id)
);

CREATE TABLE local.spt_info
(
    id            INT NOT NULL,
    title         VARCHAR(100) NULL,
    content       VARCHAR(255) NULL,
    center        VARCHAR(255) NULL,
    recruit_start datetime NULL,
    recruit_end   datetime NULL,
    hit_count     INT NULL,
    CONSTRAINT pk_sptinfo PRIMARY KEY (id)
);

CREATE TABLE local.story
(
    id         INT NOT NULL,
    member_id  INT NOT NULL,
    mt_id      INT NOT NULL,
    content    VARCHAR(255) NULL,
    created_at datetime NULL,
    is_read    BIT(1) NULL,
    CONSTRAINT pk_story PRIMARY KEY (id)
);

CREATE TABLE local.team
(
    id          INT         NOT NULL,
    name        VARCHAR(30) NOT NULL,
    point       INT NULL,
    start_date  datetime NULL,
    day_of_week INT NULL,
    time        time NULL,
    end_date    datetime NULL,
    status      VARCHAR(255) NULL,
    CONSTRAINT pk_team PRIMARY KEY (id)
);

CREATE TABLE local.team_board
(
    id         INT NOT NULL,
    user_id    INT NOT NULL,
    team_id    INT NOT NULL,
    title      VARCHAR(255) NULL,
    content    VARCHAR(255) NULL,
    created_at datetime NULL,
    edited_at  datetime NULL,
    CONSTRAINT pk_teamboard PRIMARY KEY (id)
);

CREATE TABLE local.team_msg
(
    id          BIGINT NOT NULL,
    msg_content VARCHAR(255) NULL,
    send_at     datetime NULL,
    user_id     INT    NOT NULL,
    team_id     INT    NOT NULL,
    CONSTRAINT pk_teammsg PRIMARY KEY (id)
);

CREATE TABLE local.user
(
    id          INT AUTO_INCREMENT NOT NULL,
    `role`      VARCHAR(31) NULL,
    user_id     VARCHAR(255) NULL,
    pwd         VARCHAR(255) NULL,
    name        VARCHAR(255) NULL,
    nickname    VARCHAR(255) NULL,
    email       VARCHAR(255) NULL,
    phone       VARCHAR(255) NULL,
    gender      VARCHAR(255) NULL,
    profile_img VARCHAR(255) NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);