import CommunityDetail from '../../components/Community/CommunityDetail';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 150vh;
  overflow: hidden;
  margin: 150px 0;
`;

const CommunityDetailPage = () => {
    return (
        <Main>
            <CommunityDetail></CommunityDetail>
        </Main>
    );
};

export default CommunityDetailPage;
