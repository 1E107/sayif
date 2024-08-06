import TeamMain from '../../components/Team/TeamMain';
import ShowMembers from '../../components/Team/ShowMembers';
import Board from '../../components/Team/Board/BoardList';
import QuizList from '../../components/Team/StudyQuiz/QuizList';
import Story from '../../components/Team/Story/Story';
import Chat from '../../components/Team/Chat';
import CreateStory from '../../components/Team/Story/CreateStory';
import Meeting from '../../components/Team/Meeting';
import MaterialList from '../../components/Team/MentoringDocument/List';
import ChallengeMain from '../../components/Team/challenge/ChallengeMain';
import ChallengePhoto from '../../components/Team/challenge/ChallengePhoto';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
    background-color: #f7f9f6;
    min-height: 100vh;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 50px;
`;

const MainPage = () => {
    const location = useLocation();

    return (
        <Main>
            {location.pathname === '/team' && <TeamMain />}
            {location.pathname === '/team/team-member' && <ShowMembers />}
            {location.pathname === '/team/board' && <Board />}
            {location.pathname === '/team/quiz' && <QuizList />}
            {location.pathname === '/team/story-board' && <Story />}
            {location.pathname === '/team/message' && <Chat />}
            {location.pathname === '/team/create-story' && <CreateStory />}
            {location.pathname === '/team/meeting' && <Meeting />}
            {location.pathname === '/team/material' && <MaterialList />}
            {location.pathname === '/team/challenge' && <ChallengeMain />}
            {location.pathname === '/team/challenge/photo' && (
                <ChallengePhoto />
            )}
        </Main>
    );
};

export default MainPage;
