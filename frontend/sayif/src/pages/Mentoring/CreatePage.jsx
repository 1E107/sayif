import styled from "styled-components"
import Create from "../../components/Mentoring/Create";

const Main = styled.div`
    margin-top: 170px;
    padding-left: 50px;
`;

const CreatePage = () => {
    return (
        <Main>
            <Create></Create>
        </Main>
    )
}

export default CreatePage;