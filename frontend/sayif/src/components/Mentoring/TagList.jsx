import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Tag = styled.span`
    background-color: #161616;
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 0.8em;
    color: #e8e8cc;
`;

const TagList = ({ tags }) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <TagsContainer>
            {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
            ))}
        </TagsContainer>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
