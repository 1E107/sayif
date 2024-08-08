import styled from 'styled-components';
import ChallengePhoto from '../../components/Team/challenge/ChallengePhoto';
const Main = styled.div`
    background-color: #f7f9f6;
    min-height: 100vh;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 50px;
`;

const ChallengeDetailPage = () => {
    return (
        <Main>
            <ChallengePhoto />
        </Main>
    );
};

export default ChallengeDetailPage;
