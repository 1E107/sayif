import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    height: 300px;
    width: 500px;
    margin-top: 200px;
    border-radius: 20px;
    margin-right: 40px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
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
`

const LoginButton = styled(Button)({
    width: "410px",
    height: "50px",
    backgroundColor: "#116530 !important",
    fontSize: "16px !important",
    fontFamily: "ChosunGu !important",
    color: "#E8E8CC !important",
});

const RegistButton = styled(Button)({
    width: "410px",
    height: "40px",
    backgroundColor: "white !important",
    fontSize: "14px !important",
    fontFamily: "ChosunGu !important",
    color: "#116530 !important",
    fontWeight: "bold !important",
    marginTop: "5px !important"
});


const S = {
    Container,
    Input,
    LoginButton,
    RegistButton,
};

export default S;