import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Container = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
    min-width: 1000px;
    min-height: 700px;
    background-color: white;
    border-radius: 30px;
    text-align: center;
    position: relative;
`;

const Title = styled.div`
    margin-top: 50px;
    font-size: 35px;
    font-family: ChosunGu;
    font-weight: bold;
`;

const DateAndWriter = styled.div`
    margin-top: 25px;
    font-size: 20px;
    color: gray;
    font-family: ChosunGu;
`;

const CustomHr = styled.hr`
    margin: 30px;
    background: #e9ecef;
    height: 1px;
    border: 0;
`;

const Content = styled.div`
    text-align: left;
    font-size: 18px;
    min-height: 300px;
    margin: 50px;
    color: #343a40;
    font-family: ChosunGu;
`;

const BackButton = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #116530;
    font-family: ChosunGu;
`;

const BackIcon = styled(ArrowBackIosIcon)`
    font-size: 24px;
    margin-right: 8px;
`;

const S = {
    Container,
    Title,
    DateAndWriter,
    CustomHr,
    Content,
    BackButton,
    BackIcon, // BackIcon 추가
};

export default S;
