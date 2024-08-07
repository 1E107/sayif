import styled, { keyframes } from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/fonts.css';

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1); 
    }
`;

const MainTop = styled.div`
    height: 100vh;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainTopTitle = styled.div`
    margin-top: 10px;
    font-size: 50px;
    font-family: Freesentation-9Black;
    animation: ${fadeIn} 1.1s ease-out; 
`;

const MainText = styled.div`
    font-family: NanumBarunpen;
    font-size: 18px;
    font-weight: bold;
`;

const GifContainer = styled.div`
    margin-bottom: 20px; 
    
    img {
        width: 250px; 
        height: auto; 
    }
`;

const MainMiddle = styled.div`
    height: 100vh;
    background-color: #116530;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainBottom = styled.div`
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SectionContent = styled.div`
    text-align: center;
    color: white;
    font-size: 24px;
    font-family: NanumBarunpen;
`;

const HoverIcon = styled(ExpandMoreIcon)`
    font-size: 55px; 
    margin-top: 60px;
    cursor: pointer;
    color: #888888; 
    transition: color 0.3s, transform 0.3s; 

    &:hover {
        color: #333333; 
        transform: scale(1.1); 
    }
`;

const MainSplitSection = styled.div`
    height: 100vh;
    background: linear-gradient(to bottom, white 50%, #116530 50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VideoContainer = styled.div`
    margin-top: 70px;
    width: 50vw; /* 화면 너비의 50%로 줄이기 */
    height: 28.125vw; /* 16:9 비율을 유지하기 위한 높이 */
    display: flex;
    justify-content: center;

    iframe {
        width: 100%;
        height: 100%;
    }
`;

const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const SliderArrow = styled.div`
    cursor: pointer;
    padding: 10px;
    color: white; 
    &:hover {
        color: #ddd; /* 호버 시 색상 연하게 */
    }
`;

const SlideContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 20px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const S = {
    MainTop,
    MainMiddle,
    MainTopTitle,
    MainText,
    MainBottom,
    SectionContent,
    GifContainer,
    HoverIcon,
    MainSplitSection,
    VideoContainer,
    SliderContainer,
    SliderArrow,
    SlideContent,
    ContentWrapper,
    Image
};

export default S;
