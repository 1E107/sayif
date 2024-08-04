import Community from "../../components/Community/Community";
import styled from "styled-components";

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1000px;
`

const CommunityPage = () => {
    return (
        <Main>
            <Community></Community>
        </Main>
    )
}

export default CommunityPage;