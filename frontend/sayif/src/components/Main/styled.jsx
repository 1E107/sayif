import styled, { keyframes } from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/fonts.css';

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.9); /* Start slightly smaller */
    }
    100% {
        opacity: 1;
        transform: scale(1); /* End at normal size */
    }
`;

const MainTop = styled.div`
    height: 100vh; /* Full viewport height */
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
`;

const MainTopTitle = styled.div`
    margin-top: 10px;
    font-size: 50px;
    font-family: Freesentation-9Black;
    animation: ${fadeIn} 1.1s ease-out; /* Apply the fade-in animation with 2s delay */
`;

const MainText = styled.div`
    font-family: NanumBarunpen;
    font-size: 18px;
    font-weight: bold;
`;

const GifContainer = styled.div`
    margin-bottom: 20px; /* Add some space between the GIF and the title */
    
    img {
        width: 250px; /* Set the desired width */
        height: auto; /* Maintain the aspect ratio */
    }
`;

const MainMiddle = styled.div`
    height: 100vh; /* Full viewport height */
    background-color: #116530;
    display: flex;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
`;

const MainBottom = styled.div`
    height: 100vh; /* Full viewport height */
    background-color: #ffffff;
    display: flex;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
`;

const SectionContent = styled.div`
    text-align: center;
    color: white;
    font-size: 24px;
    font-family: NanumBarunpen;
`;

const HoverIcon = styled(ExpandMoreIcon)`
    font-size: 55px; /* Slightly larger size */
    margin-top: 60px;
    cursor: pointer;
    color: #888888; /* Default lighter color */
    transition: color 0.3s, transform 0.3s; /* Smooth transition for color and size */

    &:hover {
        color: #333333; /* Darker color on hover */
        transform: scale(1.1); /* Slightly increase size on hover */
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
    HoverIcon
};

export default S;
