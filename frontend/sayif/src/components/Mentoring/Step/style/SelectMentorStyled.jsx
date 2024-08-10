import styled from 'styled-components';
import '../../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 50px;
    padding-right: 60px;
    padding-left: 10px;
    align-items: center;
`;

const Wrapper = styled.div`
    margin: 0px 60px 60px 60px;
`;

const explanText = styled.div`
    color: black;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
`;

const changeBtnText = styled.div`
    font-size: 18px;
    background-color: #d4e3da;
    color: #116530;
    padding: theme.spacing(1);
    textalign: center;
    height: 50px;
    font-family: ChosunGu;
`;

const MentorListBox = styled.div`
    background-color: #f5f5f5;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 5px;
`;

const MentorInfoTitle = styled.div`
    font-size: 10px;
    color: gray;
    font-family: ChosunGu;
`;

const MentorInfoContent = styled.div`
    font-size: 16px;
    font-weight: bold;
    font-family: ChosunGu;
    margin-top: 10px;
`;

const MentorInfoBox = styled.div`
    margin-left: 50px;
    margin-right: 50px;
`;

const Icon = styled.div`
    background-image: url('/img/Apply/apply-step3.png');
    background-size: cover;
    width: 900px;
    height: 200px;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const MentorProfileWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: cneter;
    justify-content: center;
    margin: 15px 5px 5px 5px;
`;

const S = {
    Container,
    Wrapper,
    explanText,
    changeBtnText,
    MentorListBox,
    MentorInfoTitle,
    MentorInfoContent,
    MentorInfoBox,
    Icon,
    IconWrapper,
    MentorProfileWrapper,
};

export default S;
