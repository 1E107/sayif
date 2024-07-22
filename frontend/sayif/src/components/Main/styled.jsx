import styled from "styled-components";
import '../../styles/fonts.css'

const MainTop = styled.div`
    height: 850px;
    background-color: white;
    text-align: center;
`;

const MainTopTitle = styled.div`
    font-size: 45px;
    margin-top: 250px;
    font-family: Freesentation-9Black;
`;

const MainText = styled.div`
    font-family: NanumBarunpen;
    font-size: 18px;
    font-weight: bold;
`;

const MainMiddle = styled.div`
    height: 1500px;
    background-color: #116530;
`;

const MainBottom = styled.div`
    height: 1000px;
`;

const S = {
    MainTop,
    MainMiddle,
    MainTopTitle,
    MainText,
    MainBottom
};

export default S;