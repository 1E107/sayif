import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../../styles/fonts.css';
import { BorderBottom } from '@mui/icons-material';

const Main = styled.div``;

const Container = styled.div`
    background-color: white;
    height: 600px;
    width: 1200px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
`;
const CustomImg = styled.img`
    width: 100px;
    height: 100px;
    margin: 10px;
    cursor: pointer;
`;

const PostItWrapper = styled.div`
    text-align: center;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    position: relative;
    margin-top: 100px;
    max-width: 500px;
    max-height: 500px;
    img {
        width: 100%;
        height: auto;
    }
`;

const ExplainText = styled.div`
    margin-top: 58px;
    font-family: ChosunGu;
    margin-left: 10px;
    color: gray;
`;

const CustomButton = styled(Button)({
    marginTop: '50px !important',
    marginBottom: '20px !important',
    color: '#116530CC !important',
    border: 'solid 0px #116530CC !important',
    borderRadius: '15px !important',
    fontFamily: 'ChosunGu !important',
    fontWeight: 'bold !important',
    fontSize: '17px !important',
    marginRight: '10px !important',
});

const ModalText = styled.div`
    position: absolute;
    top: 100px;
    margin-left: 55px;
    width: 400px;
    font-family: ChosunGu;
    font-size: 20px;
    word-wrap: break-word;
    white-space: pre-wrap;
    line-height: 1.5em;
`;

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-image: url('/img/clover.png');
    background-size: cover;
    background-color: #116530;
    background-position: center;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

const ReadButton = styled(Button)({
    position: 'absolute !important',
    top: '15px !important',
    right: '20px !important',
    color: '#116530CC !important',
    fontWeight: 'bold !important',
    fontSize: '16px !important',
    fontFamily: 'ChosunGu !important',
});

const S = {
    Container,
    CustomImg,
    PostItWrapper,
    CustomButton,
    Main,
    Modal,
    ModalContent,
    ModalText,
    ExplainText,
    FloatingButton,
    ReadButton,
};

export default S;
