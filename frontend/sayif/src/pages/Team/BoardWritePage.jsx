import BoardWrite from '../../components/Team/Board/BoardWrite';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 700px;
    margin: 100px;
`;

const Title = styled.h1`
    font-family: 'ChosunGu', sans-serif;
    font-size: 24px;
    color: #116530;
    margin-bottom: 20px;
`;

const BoardWritePage = () => {
    return (
        <Main>
            <Title>게시글 작성하기</Title>
            <BoardWrite />
        </Main>
    );
};

export default BoardWritePage;

