import styled, { keyframes } from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/fonts.css';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
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
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
`;

const MainTopTitle = styled.div`
    margin-top: 10px;
    font-size: 60px;
    font-family: Freesentation-9Black;
    animation: ${fadeInUp} 1.1s ease-out; 
`;

const MainText = styled.div`
    font-family: NanumBarunpen;
    font-size: 30px;
    font-weight: bold;
    transition: opacity 1s ease-out, transform 1s ease-out;
`;

const GifContainer = styled.div`
    margin-bottom: 20px; 
    
    img {
        width: 280px; 
        height: auto; 
    }
`;

const MainMiddle = styled.div`
    height: 100vh;
    background-color: #116530;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
`;

const MainBottom = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* 상대적 위치 설정 */
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
`;

const SectionContent = styled.div`
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 34px;
    font-family: 'NanumBarunpen', sans-serif;
    z-index: 2; /* 텍스트를 위에 표시 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px; /* 텍스트 주변 여백 */
`;

const VideoBackground = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1; /* 배경으로 설정 */
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 어두운 오버레이 */
    z-index: 1; /* 오버레이를 배경 영상 위에 표시 */
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
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
`;

const VideoContainer = styled.div`
    width: 60vw; /* 화면 너비의 60% */
    height: 33.75vw; /* 16:9 비율을 유지하기 위한 높이 (60vw * 9/16) */
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    iframe {
        width: 100%;
        height: 100%;
    }
`;

const SliderArrow = styled.div`
    cursor: pointer;
    padding: 10px;
    color: white; 
    &:hover {
        color: #ddd; /* 호버 시 색상 연하게 */
    }
`;

const slideTransition = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column; /* 수직 방향으로 배열 */
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 중앙 정렬 */
    width: 100%;
    height: 100%;
    overflow: hidden; // 추가
    position: relative;
`;

const SlideContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideTransition} 1.2s ease-out;
  height: 500px; // 적절한 고정 높이 설정
  cursor: pointer;  // 이 줄을 추가
  position: relative; // 위치를 상대적으로 설정
`;

const Indicators = styled.div`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    margin: 0px 5px 110px;
    border-radius: 50%;
    background-color: ${(props) => (props.isActive ? '#E8E8CC' : '#344100')}; /* 활성화된 점 색깔 변경 */
    cursor: pointer; /* 커서 포인터 추가 */
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: 20px;
    align-items: center; /* 중앙 정렬 */
    display: flex;
`;

const Image = styled.img`
    object-fit: contain; // 이미지 비율 유지
    cursor: default; 
    ${(props) => props.clickable && `
      cursor: pointer;
      
      &:hover {
      transform: scale(1.05); /* 버튼이 약간 커짐 */
    }
    `}
`;

const InformationSection = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 2s ease-out, transform 2s ease-out;
    
    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    img {
        margin-left: 70px;
        margin-bottom: 40px;
    }
`;

const TopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #116530;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0B4619;
    }
`;

const S = {
    MainTop,
    MainMiddle,
    MainTopTitle,
    MainText,
    MainBottom,
    SectionContent,
    VideoBackground,
    Overlay,
    GifContainer,
    HoverIcon,
    MainSplitSection,
    VideoContainer,
    SliderContainer,
    SliderArrow,
    slideTransition,
    SlideContent,
    Indicators,
    Dot,
    ContentWrapper,
    Image,
    InformationSection,
    ImageWrapper,
    TopButton
};

export default S;
