import MyPageComponent from '../../components/Member/MyPage';
import styled from 'styled-components';

const Main = styled.div`
    margin-top: 60px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MyPage = () => {
    return (
        <Main>
            <MyPageComponent />
        </Main>
    );
};

export default MyPage;
