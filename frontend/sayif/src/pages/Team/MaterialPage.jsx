import MaterialDetail from "../../components/Team/MentoringDocument/Detail";
import styled from "styled-components";

const Main = styled.div`
    background-color: #F7F9F6;
    min-height: 800px;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
`;

const MaterialPage = () => {
    return (
        <Main>
           <MaterialDetail/>
        </Main>
    )
}

export default MaterialPage;