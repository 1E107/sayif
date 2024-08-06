import styled from 'styled-components';
import '../../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 50px;
    padding-right: 60px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    background-image: url('/img/Apply/apply-step1.png');
    background-size: cover;
    width: 900px;
    height: 150px;
`;

const DateTimeContainer = styled.div`
    display: inline-flex;
`;

const TimeBtn = styled.div`
    padding-top: 5px;
`;

const BOX = styled.div`
    width: 400px;
    display: inline-block;
    margin: 25px;
`;

const TimeSelectText = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-weight: bold;
    display: inline-block;
`;

const TimeBlock = styled.div`
    width: 400px;
    background-color: #f5f5f5;
    border-radius: 0px 0px 10px 10px;
    height: 247px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ContainerText = styled.div`
    background-color: #f5f5f5;
    border-radius: 10px 10px 0px 0px;
    padding-top: 20px;
    font-family: ChosunGu;
    font-size: 15px;
    font-weight: bold;
    color: #868e96;
`;

const S = {
    Container,
    DateTimeContainer,
    ContainerText,
    BOX,
    TimeBlock,
    TimeBtn,
    TimeSelectText,
    Icon,
};

export default S;
