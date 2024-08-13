import styled from 'styled-components';
import '../../../styles/fonts.css';

const Title = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    font-size: 19px;
    margin-bottom: 20px;
    margin-top: 50px;
`;

const Container = styled.div`
    margin: 50px 0px 50px 0px;
`;

const MentorList = styled.div`
    display: flex;
    gap: 100px;
`;

const MentorNameText = styled.div`
    font-size: 20px;
    font-weight: bold;
    font-family: ChosunGu;
    margin-bottom: 10px;
`;

const MentorInfoText = styled.div`
    font-family: ChosunGu;
    font-size: 15px;
`;

const MentorExplan = styled.div`
    color: #116530;
    font-family: ChosunGu;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 20px;
`;

const TagList = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const TagBox = styled.div`
    background-color: #161616;
    font-family: ChosunGu;
    color: white;
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 14px;
    text-align: center;
`;

const MenteeList = styled.div`
    display: flex;
    gap: 30px;
`;

const MenteeCard = styled.div`
    background-color: white;
    height: 280px;
    width: 200px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenteeImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 70%;
    margin-bottom: 30px;
`;

const MenteeNickname = styled.div`
    text-align: center;
    font-family: ChosunGu;
    font-size: 22px;
    margin-top: 20px;
    color: #116530;
    font-weight: bold;
`;

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-image: url('/img/clover.png');
    background-size: cover;
    background-color: #116530;
    background-position: center;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;
const MentoringDetails = styled.div`
    font-family: 'ChosunGu', sans-serif;
    font-size: 18px;
    color: #0b4619;
    text-align: center;
    font-weight: bold;

    & > div {
        margin-bottom: 10px;
    }
`;

const S = {
    Title,
    Container,
    MentorNameText,
    MentorInfoText,
    MentorExplan,
    TagBox,
    TagList,
    MentorList,
    MenteeList,
    MenteeCard,
    MenteeImg,
    MenteeNickname,
    FloatingButton,
    MentoringDetails,
};

export default S;
