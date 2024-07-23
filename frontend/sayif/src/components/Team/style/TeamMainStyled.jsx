import styled from "styled-components";
import '../../../styles/fonts.css'

const Container = styled.div`
    background-color: #F7F9F6;
    height: 600px;
    justify-content: center;
    display: flex;
    align-items: center;
`;

const ImageBox = styled.div`
    height: 400px;
    width: 400px;
    background-color: white;
    border-radius: 30px;
`;

const Wrapper = styled.div`
`;

const TeamNameText = styled.div`
    color: #116530;
    font-size: 25px;
    font-family: ChosunGu;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`

const TeamScoreText = styled.div`
    font-size: 20px;
    margin-top: 5px;
    color: #116530;
`

const ScoreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const S = {
    Container,
    ImageBox,
    TeamNameText,
    Wrapper,
    TeamScoreText,
    ScoreContainer
}

export default S;