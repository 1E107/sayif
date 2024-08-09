import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    width: 1000px;
    height: 600px;
    border-radius: 40px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const NickNameText = styled.div`
    margin-top: 30px;
    font-size: 25px;
    font-family: ChosunGu;
    color: #e8e8cc;
    background-color: #116530;
    padding: 10px;
    border-radius: 30px;
`;

const ImgIcon = styled.div`
    position: absolute;
    color: white;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TitleText = styled.div`
    font-family: ChosunGu;
    color: #116530;
    font-weight: bold;
    font-size: 18px;
    width: 100px;
`;

const CustomInput = styled.input`
    height: 40px;
    width: 300px;
    border-radius: 10px;
    border: 0px solid;
    background-color: #e8e8ccb2;
    padding: 5px 0px 5px 10px;
    font-family: ChosunGu;

    &::placeholder {
        color: black;
    }
`;

const UpdateText = styled.div`
    margin-top: 30px;
    font-family: ChosunGu;
    font-size: 13px;
`;

const ErrorMsg = styled.div`
    font-size: 13px;
    margin-top: 10px;
    font-family: ChosunGu;
    color: red;
    margin-left: 100px;
`;

const ProfileUpdateBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    color: '#E8E8CC !important',
    backgroundColor: '#116530 !important',
    margin: '50px 10px 0px 10px !important',
    width: '170px',
    fontSize: '18px !important',
});

const LogoutBtn = styled(Button)({
    marginTop: '10px !important',
    fontFamily: 'ChosunGu !important',
});

const S = {
    Container,
    TitleText,
    CustomInput,
    NickNameText,
    ProfileUpdateBtn,
    LogoutBtn,
    UpdateText,
    ErrorMsg,
    ImgIcon,
    ImageContainer,
};

export default S;
