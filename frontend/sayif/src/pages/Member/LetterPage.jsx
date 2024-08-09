import Letter from '../../components/Member/Letter';
import styled from 'styled-components';

const Main = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LetterPage = () => {
    return (
        <Main>
            <Letter></Letter>
        </Main>
    );
};

export default LetterPage;
