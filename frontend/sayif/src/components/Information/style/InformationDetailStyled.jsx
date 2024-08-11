import styled from 'styled-components';
import '../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const BeforeButton = styled(Button)({
    marginBottom: '30px !important',
    fontFamily: 'ChosunGu !important',
    color: '#116530 !important',
    fontSize: '17px !important',
    marginRight: '550px !important',
});

const Title = styled.div`
    color: #116530;
    font-family: ONE-Mobile-POP;
    margin-top: 130px;
    font-size: 30px;
`;

const Line = styled.hr`
    margin-top: 15px;
    width: 230px;
    border-top: 2px solid #116530;
    margin-bottom: 15px;
`;

const Form = styled.div`
    height: 800px;
    width: 700px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    margin-bottom: 100px;
    border-radius: 30px;
`;

const CustomImg = styled.img`
    width: 300px;
    height: 350px;
    border-radius: 20px;
`;

const TitleText = styled.div`
    margin-top: 30px;
    margin-left: 20px;
    font-family: ChosunGu;
    font-size: 22px;
    line-height: 150%;
    font-weight: bold;
`;

const ContentText = styled.div`
    margin-left: 25px;
    margin-top: 40px;
    font-family: ChosunGu;
`;

const ButtonCustom = styled.button`
    background-color: #116530; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 10px;
    font-family: ChosunGu;
    margin-top: 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const S = {
    Container,
    Title,
    Line,
    Form,
    CustomImg,
    TitleText,
    ContentText,
    ButtonCustom,
    ButtonContainer,
    BeforeButton,
};

export default S;
