import styled from 'styled-components';
import '../../../styles/fonts.css';

const Title = styled.div`
    font-family: ONE-Mobile-POP;
    font-size: 25px;
`;

const Container = styled.div`
    text-align: center;
`;

const ExplainText = styled.div`
    font-family: ChosunGu;
    font-size: 15px;
    margin-top: 13px;
`;

const ApplyIconContainer = styled.div`
    height: 300px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

const ApplyIconStep1 = styled.div`
    background-image: url('/img/Apply/apply-step1.png');
    background-size: cover;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    aligin-items: center;
`;

const ApplyIconText = styled.div`
    font-family: ChosunGu;
    font-weight: bold;
    font-size: 15px;
`;

const S = {
    Title,
    ExplainText,
    Container,
    ApplyIconStep1,
    ApplyIconContainer,
    ApplyIconText,
};

export default S;
