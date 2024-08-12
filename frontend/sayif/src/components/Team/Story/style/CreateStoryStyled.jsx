import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

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
    font-size: 18px;
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

const S = {
    Container,
    Form,
    TitleText,
    CustomTextarea,
    ContentText,
    CustomBtn,
};

export default S;
