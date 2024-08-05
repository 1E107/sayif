import React from 'react';
import MentorList from '../../components/Mentoring/MentorList';
import styled from 'styled-components';
// import '../../../styles/fonts.css';

const AppContainer = styled.div`
    font-family: Arial, sans-serif;
    padding: 20px;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 70px;
    margin-bottom: 20px;
`;

const Profile = () => {
    return (
        <AppContainer>
            <Title>멘토 프로필</Title>
            <MentorList />
        </AppContainer>
    );
};

export default Profile;
