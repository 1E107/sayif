import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
    background-color: #e7ede5;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
`;

const Name = styled.h3`
    margin: 10px 0 5px 0;
`;

const Cohort = styled.p``;

const Description = styled.p`
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
`;

const MBTI = styled.p`
    margin: 5px 0;
`;

const Tags = styled.div`
    display: flex;
    gap: 10px;
    margin: 10px 0;
`;

const Tag = styled.span`
    background-color: #a0a7a5;
    border-radius: 5px;
    padding: 5px 10px;
`;

const MessageLink = styled.a`
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
`;

const MentorCard = ({
    seq,
    name,
    intro,
    track,
    profileImg,
    major,
    regCode,
    nickname,
}) => {
    return (
        <Card>
            <Avatar src={profileImg} alt={`${name} avatar`} />
            <Name>{name}</Name>
            <Cohort>
                {seq}기_{regCode}_{track}
            </Cohort>
            <Description>{intro}</Description>
            <MBTI>{major}</MBTI>
            <Tags>
                <Tag>{nickname}</Tag>
            </Tags>
            <MessageLink href="#">쪽지 보내기</MessageLink>
        </Card>
    );
};

MentorCard.propTypes = {
    name: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
};

export default MentorCard;
