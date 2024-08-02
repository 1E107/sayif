import styled from "styled-components";
import Typography from '@mui/material/Typography';
import '../../styles/fonts.css'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    color: #116530;
    font-family: ONE-Mobile-POP;
    font-size: 30px;
    margin-top: 130px;
`

const Line = styled.hr`
    margin-top: 15px;
    width: 210px;
    border-top: 2px solid #116530;
    margin-bottom: 80px;
`

const InfoTitle = styled(Typography)({
    fontFamily: "ChosunGu !important",
    fontSize: "18px !important",
    padding: "10px !important",
    width: "200px !important",
});

const InfoContent = styled(Typography)({
    fontFamily: "ChosunGu !important",
    padding: "1px",
})

const S = {
    Container,
    Title,
    Line,
    InfoTitle,
    InfoContent
}

export default S; 