import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    height: 300px;
    width: 500px;
    margin-top: 250px;
    border-radius: 20px;
    margin-right: 60px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 30px;
    @media (max-width: 640px) {
        width: 320px; 
        padding: 0 10px; 
    }
`;

const Input = styled.input`
    width: 400px;
    height: 50px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #E8E8CCB2;
    border-width: 0px;
    padding-left: 10px;
    color: #116530;
    maring-left: 10px;
    maring-right: 10px;
    @media (max-width: 640px) {
        width: 260px; 
        padding: 0 10px; 
    }
`

const LoginButton = styled(Button)`
    width: 410px;
    height: 50px;
    background-color: #116530 !important;
    font-size: 16px !important;
    font-family: ChosunGu !important;
    color: #E8E8CC !important;

    @media (max-width: 640px) {
        width: 280px;
        padding: 0 10px; 
    }
`;

const RegistButton = styled(Button)`
    width: 410px;
    height: 40px;
    background-color: white !important;
    font-size: 14px !important;
    font-family: ChosunGu !important;
    color: #116530 !important;
    font-weight: bold !important;
    margin-top: 5px !important;

    @media (max-width: 640px) {
        width: 280px;
        padding: 0 10px; 
    }
`;


const S = {
    Container,
    Input,
    LoginButton,
    RegistButton,
};

export default S;