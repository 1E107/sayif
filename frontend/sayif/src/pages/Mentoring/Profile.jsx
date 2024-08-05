import styled from 'styled-components';
import MentorList from '../../components/Mentoring/MentorList';

const Main = styled.div`
    margin-top: 170px;
    padding-left: 50px;
`;

const CreatePage = () => {
    return (
        <Main>
            <MentorList></MentorList>
        </Main>
    );
};

export default CreatePage;
