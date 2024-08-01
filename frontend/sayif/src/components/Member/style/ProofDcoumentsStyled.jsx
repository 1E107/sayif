import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    width: 600px;
    height: 500px;
    margin: 150px 0px 100px 50px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const Text = styled.div`
    font-family: ChosunGu;
    text-align: center;
    line-height: 150%;
    color: #116530;
    font-size: 17px;
    margin-bottom: 30px;
`;

const FileBtn = styled(Button)({
    margin: "10px !important",
    fontFamily: "ChosunGu !important",
    width: "120px",
    backgroundColor: "#E8E8CCB2 !important",
    color: "black !important",
});

const SubmitBtn = styled(Button)({
    backgroundColor: "#116530 !important",
    width: "140px",
    marginTop: "30px !important",
    fontFamily: "ChosunGu !important",
    color: "#E8E8CC !important",
    fontSize: "16px !important"
})

const S = {
    Container,
    FileBtn,
    Text,
    SubmitBtn
}

export default S;