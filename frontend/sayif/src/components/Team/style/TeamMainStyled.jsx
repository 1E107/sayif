import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

const CustomSnackbar = styled(Snackbar)`
    transform: translateY(50px);
    & .MuiAlert-root {
        background-color: #0b4619;
        color: #fdfed3;
        font-family: 'Chosungu';
        font-size: 15px;
    }
`;

const CustomAlert = styled(Alert)`
    width: 100%;
`;

const CustomModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CustomBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #ffffff;
    box-shadow: 24px;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    font-family: 'Chosungu'; /* 전체 텍스트에 적용 */
`;

const CustomTextField = styled(TextField)`
    margin-bottom: 16px !important;
    font-family: 'Chosungu';

    & .MuiInputBase-input {
        font-family: 'Chosungu';
    }

    & .MuiInputLabel-root {
        font-family: 'Chosungu';
    }

    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: #ded3a6; // 기본 border 색깔
        }
        &:hover fieldset {
            border-color: #0b4619; // 호버 시 border 색깔
        }
        &.Mui-focused fieldset {
            border-color: #0b4619; // 포커스 시 border 색깔
        }
    }
    & .MuiInputLabel-root.Mui-focused {
        color: #0b4619; // 포커스 시 라벨 색깔
    }
`;

const CustomButton = styled(Button)`
    font-family: 'Chosungu';
    background-color: #0b4619 !important;
`;

const CustomModalTitle = styled.h2`
    font-family: 'Chosungu';
    margin-bottom: 16px;
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
    CustomSnackbar,
    CustomAlert,
    CustomModal,
    CustomBox,
    CustomTextField,
    CustomButton,
    CustomModalTitle,
};

export default S;
