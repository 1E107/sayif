import styled from "styled-components";
import '../../../../styles/fonts.css'

const Container = styled.div`
    margin-top: 50px;
    padding-right: 10px;
    padding-left: 10px;
`;

const DateTimeContainer = styled.div`
    display : inline-flex;
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
    display : inline-block;
`

const TimeBlock = styled.div`
    width: 400px;
    background-color: #F5F5F5;
    border-radius: 0px 0px 10px 10px;
    height: 267px;
`;

const ContainerText = styled.div`
    background-color: #F5F5F5;
    border-radius: 10px 10px 0px 0px;
    padding-top: 20px;
    font-family: ChosunGu;
    font-size: 15px;
    font-weight: bold;
    color : #868E96;
`;


const S = {
    Container,
    DateTimeContainer,
    ContainerText,
    BOX,
    TimeBlock,
    TimeBtn,
    TimeSelectText
};

export default S;