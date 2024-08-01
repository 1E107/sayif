// MeetingStyled.jsx
import styled from 'styled-components';
import '../../../styles/fonts.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Logo = styled.img`
    display: block;
    margin: 0 auto;
`;

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const VideoContainer = styled.div`
    display: ${props => (props.$isConnected ? 'flex' : 'none')};
    flex: 1;
    width: 70%;
    height: 70vh;
    background-color: #f0f0f0;
    margin-right: 20px;
`;

const ChatContainer = styled.div`
    display: ${props => (props.$isConnected ? 'block' : 'none')};
    width: 25%;
    height: 70vh;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 5px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: ${props => (props.$isConnected ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
`;

const Button = styled.button`
    margin: 0 10px;
`;

const S = {
    Container,
    Logo,
    ContentContainer,
    VideoContainer,
    ChatContainer,
    ButtonContainer,
    Button,
};

export default S;
