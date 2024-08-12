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

const ShowTextWrapper = styled.div`
    margin: 0px 40px 40px 40px;
`;

const MainTitle = styled.div`
    font-family: Freesentation-9Black;
    font-size: 35px;
    margin-top: 10px;
`;

const SubText = styled.div`
    margin-top: 40px;
    font-family: ChosunGu;
    font-size: 16px;
    margin-bottom: 50px;
    line-height: 140%;
`;

const SubTextHigh = styled.span`
    background-color: #116530;
    color: white;
    padding: 2px;
    border-radius: 3px;
    font-size: 13px;
`;

const Icon = styled.div`
    background-image: url('/img/Apply/apply-step4.png');
    background-size: cover;
    width: 900px;
    height: 200px;
`;

const S = {
    Container,
    ShowTextWrapper,
    MainTitle,
    SubText,
    SubTextHigh,
    Icon,
};

export default S;
