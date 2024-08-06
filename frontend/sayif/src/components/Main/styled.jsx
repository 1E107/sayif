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
    height: 100vh; /* 화면 전체 높이 */
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
    height: 100vh; /* 화면 전체 높이 */
    background-color: #116530;
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const MainBottom = styled.div`
    height: 100vh; /* 화면 전체 높이 */
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
    color: #888888; /* 기본 연한 색상 */
    transition: color 0.3s, transform 0.3s; /* 색상과 크기 변경 시 부드러운 전환 */

    &:hover {
        color: #333333; /* 호버 시 어두운 색상 */
        transform: scale(1.1); /* 호버 시 크기 약간 증가 */
    }
`;

const MainSplitSection = styled.div`
    height: 100vh; /* 화면 전체 높이 */
    background: linear-gradient(to bottom, white 50%, #116530 50%);
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const VideoContainer = styled.div`
    margin-top: 70px;
    width: 70vw; /* 화면 너비의 70% */
    height: 39.375vw; /* 16:9 비율을 유지하기 위한 높이 */
    display: flex;
    justify-content: center; /* 비디오 수평 중앙 정렬 */

    iframe {
        width: 100%;
        height: 100%;
    }
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
    VideoContainer
};

export default S;
