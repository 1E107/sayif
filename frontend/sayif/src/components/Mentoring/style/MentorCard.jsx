import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MentorCardContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    background-color: #f9f9f9;
`;

const MentorName = styled.h3`
    margin-top: 0;
`;

const MentorCohort = styled.p``;

const MentorDescription = styled.p``;

const MentorMbti = styled.p``;

const TagsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const Tag = styled.span`
    background-color: #ddd;
    border-radius: 4px;
    padding: 4px 8px;
`;

const Link = styled.a`
    display: block;
    margin-top: 16px;
    color: #007bff;
    text-decoration: none;
`;

const MentorCard = ({ name, cohort, description, mbti, tags }) => {
    return (
        <MentorCardContainer>
            <MentorName>{name}</MentorName>
            <MentorCohort>{cohort}</MentorCohort>
            <MentorDescription>{description}</MentorDescription>
            <MentorMbti>{mbti}</MentorMbti>
            <TagsContainer>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagsContainer>
            <Link href="#">쪽지 보내기</Link>
        </MentorCardContainer>
    );
};

MentorCard.propTypes = {
    name: PropTypes.string.isRequired,
    cohort: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mbti: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorCard;
