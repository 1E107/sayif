import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../../styles/fonts.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-top: 90px;
`;

const title = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const QuizBox = styled.div`
    height: 70px;
    width: 800px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const QuizNumber = styled.div`
    margin-left: 20px;
    color: #116530;
    background-color: #e8e8cc;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    font-weight: bold;
`;

const QuizTitle = styled.div`
    font-family: ChosunGu;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    line-height: 140%;
    width: 500px;
    padding: 5px 0px 5px 0px;
`;

const QuizWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomBtn = styled(Button)({
    border: '1px solid #116530 !important',
    color: '#116530 !important',
    borderRadius: '15px !important',
    fontFamily: 'ChosunGu !important',
    marginRight: '20px !important',
    width: '110px !important',
});

const PointText = styled.div`
    margin-right: 13px;
    color: #b1b1b1;
    font-family: ChosunGu;
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

const S = {
    title,
    QuizBox,
    Container,
    QuizNumber,
    QuizTitle,
    QuizWrapper,
    CustomBtn,
    PointText,
    FloatingButton,
};

export default S;
