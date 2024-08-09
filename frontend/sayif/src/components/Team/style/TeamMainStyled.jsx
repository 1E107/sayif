import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import '../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImageBox = styled.div`
    height: 300px;
    width: 300px;
    background-color: white;
    border-radius: 30px;
    background-image: url(${props => props.imageUrl});
    background-size: contain; /* 이미지를 잘리지 않게 */
    background-repeat: no-repeat;
    background-position: center;
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

const CustomLinearProgress = styled(LinearProgress)`
    padding: 10px;
    margin: 20px 10px 10px 10px;
    width: 250px;
    border-radius: 10px;
    background-color: #e8e8cc !important;

    & .MuiLinearProgress-bar {
        background-color: #116530;
    }
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
    CustomLinearProgress,
};

export default S;
