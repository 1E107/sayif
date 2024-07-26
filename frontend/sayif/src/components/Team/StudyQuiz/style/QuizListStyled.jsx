import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../../styles/fonts.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-top: 65px;
`;

const title = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const QuizBox = styled.div`
    height: 65px;
    width: 700px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
`

const QuizNumber = styled.div`
    margin-left: 20px;
    color: #116530;
    background-color: #E8E8CC;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    font-weight: bold;
`

const QuizTitle = styled.div`
    font-family: ChosunGu;
    margin-left: 20px;
    font-weight: bold;
`

const QuizWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const CustomBtn = styled(Button)({
    border: "1px solid #116530 !important",
    color: "#116530 !important",
    borderRadius: "15px !important",
    fontFamily: "ChosunGu !important",
    marginRight: "20px !important",
    width: "110px !important",
})

const PointText = styled.div`
    margin-right: 13px;
    color: #B1B1B1;
    font-family: ChosunGu;
`

const S = {
    title,
    QuizBox,
    Container,
    QuizNumber,
    QuizTitle,
    QuizWrapper,
    CustomBtn,
    PointText
}

export default S;