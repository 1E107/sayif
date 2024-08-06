// MeetingStyled.jsx
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import '../../../styles/fonts.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const HorizontalContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    margin-right: 10px;
`;

const Logo = styled.img`
    display: block;
    margin: 0 auto 20px auto;
    width: 80px;
    height: auto;
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
    display: ${props => (props.$isConnected ? 'flex' : 'none')};
    flex-direction: column;
    height: 70vh;
    width: 25%;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 5px;
    margin-bottom: 10px;
`;

const ChatMessages = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const ChatInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
`;

const ButtonContainer = styled.div`
    display: ${props => (props.$isConnected ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
`;

const DiffBtn = styled(Button)({
    border: "1px solid #116530 !important",
    backgroundColor: "#116530 !important", // 글자색을 배경색으로 설정
    color: "#ffffff !important", // 텍스트를 흰색으로 설정
    borderRadius: "15px !important",
    fontFamily: "ChosunGu !important",
    width: "200px !important",
    margin: "0 10px"
});

const IconButtonStyled = styled(IconButton)`
    border: 1px solid #116530 !important;
    color: #116530 !important;
    border-radius: 15px !important;
    font-family: 'ChosunGu' !important;
    margin-right: 20px !important;
    margin: 0 10px;
`;

const S = {
    Container,
    CenteredContainer,
    HorizontalContainer,
    Input,
    Logo,
    VideoContainer,
    ChatContainer,
    ChatMessages,
    ChatInputContainer,
    ButtonContainer,
    DiffBtn,
    IconButtonStyled,
};

export default S;
