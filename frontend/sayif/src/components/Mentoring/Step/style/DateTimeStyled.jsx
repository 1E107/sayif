import styled from "styled-components";
import '../../../../styles/fonts.css'

const Container = styled.div`
    margin-top: 50px;
    padding-right: 250px;
    padding-left: 250px;
`;

const DateContainer = styled.div`
    width: 400px;
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
    ContainerText,
    DateContainer
};

export default S;