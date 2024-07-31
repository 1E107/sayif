import styled from "styled-components";
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const title = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    // flex: 0 0 auto;
    // display: flex;
    // align-items: center;
`;

const Container = styled.div`
    margin-top: 20px;
    background-color: white;
    width: 800px;
    height: 600px;
    border-radius: 20px;
    margin-bottom: 50px;
    text-align: center;
`


const TestTitle = styled.div`
    font-family: ChosunGu;
    color: #116530;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 40px;
    font-weight: bold;
    margin-bottom: 40px;
    padding-top: 50px;
    font-size: 20px;
`

const CustomButton = styled(Button)({
    backgroundColor: "#116530 !important",
    fontFamily: "ChosunGu !important",
    marginTop: "100px !important"
})


const S = {
    title,
    Container,
    TestTitle,
    CustomButton
}

export default S;