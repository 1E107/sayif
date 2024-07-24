import BoardDetail from "../../components/Team/Board/BoardDetail";
import styled from "styled-components";

const Main = styled.div`
    background-color: #F7F9F6;
    min-height: 800px;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 50px;
`;

const MainPage = () => {
    return (
        <Main>
           <BoardDetail/>
        </Main>
    )
}

export default MainPage;