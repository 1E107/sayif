import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Container = styled.div`
    margin-top: 80px;
`;

const TitleText = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
`;

const Form = styled.div`
    height: 525px;
    background-color: white;
    width: 800px;
    border-radius: 30px;
    text-align: center;
`;

const ContentText = styled.div`
    padding-top: 30px;
    font-family: ChosunGu;
    font-size: 16px;
    color: gray;
    line-height: 140%;
`;

const CustomTextarea = styled.textarea`
    font-size: 20px;
    line-height: 28px;
    width: 500px;
    height: 300px;
    margin-top: 30px;
    border-radius: 10px;
    font-family: ChosunGu;
    padding: 7px;
`;

const CustomBtn = styled(Button)({
    fontSize: '16px !important',
    marginTop: '30px !important',
    fontFamily: 'ChosunGu !important',
    width: '140px',
    backgroundColor: '#116530 !important',
});

const CustomSnackbar = styled(Snackbar)`
    &.MuiSnackbar-root {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -30%);
    }
`;

const CustomAlert = styled(Alert)`
    width: 100%;
    font-family: 'ChosunGu' !important;
    & .MuiAlert-icon {
        color: #fdfed3;
    }
    & .MuiAlert-message {
        font-size: 18px;
    }
`;

const ConfirmButton = styled(Button)`
    color: #0b4619 !important;
    font-family: 'ChosunGu' !important;
    font-weight: bold !important;
    padding: 6px 16px !important;
    background-color: transparent !important;
    &:hober {
        background-color: rgba(11, 70, 25, 0.1) !important;
    }
`;

const S = {
    Container,
    Form,
    TitleText,
    CustomTextarea,
    ContentText,
    CustomBtn,
    CustomSnackbar,
    CustomAlert,
    ConfirmButton,
};

export default S;
