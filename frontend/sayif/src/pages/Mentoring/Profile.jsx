import React from 'react';
import MentorList from '../../components/Mentoring/MentorList';
import styled from 'styled-components';
import S from '../../components/Mentoring/style/ApplyStyled';

const Main = styled.div`
    margin-top: 110px;
    padding-left: 50px;
`;

const Profile = () => {
    return (
        <Main>
            <S.Title>멘토링 신청</S.Title>
            <S.ExplainText>멘토 프로필을 확인하세요 !</S.ExplainText>
            <MentorList />
        </Main>
    );
};

export default Profile;
