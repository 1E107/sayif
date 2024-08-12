import CommunityDetail from '../../components/Community/CommunityDetail';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    margin: 100px 0;
`;

const CommunityDetailPage = () => {
    return (
        <Main>
            <CommunityDetail></CommunityDetail>
        </Main>
    );
};

export default CommunityDetailPage;
