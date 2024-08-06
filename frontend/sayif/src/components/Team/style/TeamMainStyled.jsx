import styled from 'styled-components';
import '../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageBox = styled.div`
    height: 300px;
    width: 300px;
    background-color: white;
    border-radius: 30px;
`;

const Wrapper = styled.div``;

const TeamNameText = styled.div`
    color: #116530;
    font-size: 20px;
    font-family: ChosunGu;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

const TeamScoreText = styled.div`
    font-size: 16px;
    margin-top: 5px;
    color: #116530;
`;

const ScoreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BubbleImg = styled.img`
    height: 130px;
    width: 570px;
    margin-top: 50px;
`;

const TextOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 10%;
    font-family: Ownglyph_ryurue-Rg;
    font-size: 20px;
`;

const S = {
    Container,
    ImageBox,
    TeamNameText,
    Wrapper,
    TeamScoreText,
    ScoreContainer,
    BubbleImg,
    TextOverlay,
};

export default S;
