import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    height: auto;
    width: 500px;
    margin: 250px 0px 100px 50px;
    border-radius: 20px;
    margin-right: 60px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 50px 0px;
`;

const TitleText = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    font-size: 17px;
`;

const ImgSelect = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid #e9ecef;
    margin-top: 20px;
    cursor: pointer;
    object-fit: cover;
    &:hover {
        filter: brightness(0.3);
        transition: filter 0.3s ease;
    }

    &:hover + div {
        transition: filter 0.3s ease;
        display: block;
    }
`;

const ImgIcon = styled.div`
    position: absolute;
    margin-bottom: 50px;
    color: white;
    display: none;
`;

const SubmitBtn = styled(Button)({
    marginTop: '30px !important',
    fontFamily: 'ChosunGu !important',
    backgroundColor: '#116530 !important',
});

const ExplanText = styled.div`
    font-family: ChosunGu;
    font-size: 14px;
    margin-top: 20px;
`;

const S = {
    Container,
    TitleText,
    ImgSelect,
    SubmitBtn,
    ExplanText,
    ImgIcon,
};

export default S;
