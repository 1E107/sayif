import styled from "styled-components";
import '../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.div`
    margin-top: 40px;
    font-family: ONE-Mobile-POP;
    font-size: 25px;
`

const ExplainText = styled.div`
    font-family: ChosunGu;
    font-size: 15px;
    margin-top: 13px;
`

const CustomTdTitle = styled.td`
    background-color: #E7F0DC;
    width: 300px;
    height: 100px;
    padding-left: 10px;
    border: 1px solid gray;
    font-size: 14px;
`

const CustomTable = styled.table`
    border: 1px solid gray;
    border-collapse: collapse;
    margin-top: 40px;
    margin-bottom: 40px;
    font-family: ChosunGu;
`


const CustomTdContent = styled.td`
    padding-left: 20px;
    width: 700px;
    border: 1px solid gray;
`

const MentorTitle = styled.div`
    font-weight: bold;
`

const CustomCancelBtn = styled(Button)({
    width: "130px",
    height: "40px",
    backgroundColor: "#d4e3da !important",
    color: "#116530 !important",
    fontFamily: "ChosunGu !important",
    fontWeight: "bold !important",
    fontSize: "15px !important"
});

const CustomRegistBtn = styled(Button)({
    width: "130px",
    height: "40px",
    backgroundColor: "#116530 !important",
    color: "#FEFAE0 !important",
    fontFamily: "ChosunGu !important",
    fontWeight: "bold !important",
    fontSize: "15px !important"
});

const CustomDayBtn = styled(Button)({
    border: "1px solid black !important",
    color: "black !important",
    fontFamily: "ChosunGu !important"
})

const BtnGroup = styled.div`
    margin-bottom: 50px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 100px;
`

const S = {
    Container,
    Title,
    ExplainText,
    CustomTdTitle,
    CustomTable,
    CustomTdContent,
    CustomCancelBtn,
    BtnGroup,
    CustomRegistBtn,
    MentorTitle,
    CustomDayBtn,
}

export default S;