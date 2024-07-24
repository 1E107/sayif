import TeamMain from "../../components/Team/TeamMain";
import ShowMembers from "../../components/Team/ShowMembers";
import { useLocation } from "react-router-dom";
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
    const location = useLocation();

    return (
        <Main>
            {location.pathname === '/team' && <TeamMain/>}
            {location.pathname === '/team/team-member' && <ShowMembers/>}
        </Main>
    )
}

export default MainPage;