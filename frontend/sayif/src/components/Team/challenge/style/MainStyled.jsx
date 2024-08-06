import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
    margin-bottom: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 60px;
    font-family: SDSamliphopangche_Outline;
    color: #116530;
    padding: 35px 25px 5px 25px;
`;

const MissionBox = styled.div`
    background-color: white;
    width: 620px;
    height: 450px;
    border-radius: 30px;
    border: 5px solid #116530;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ExplanText = styled.div`
    width: 550px;
    font-family: ChosunGu;
    font-size: 14px;
    line-height: 140%;
    margin-top: 10px;
`;

const ContentText = styled.div`
    width: 500px;
    font-family: PeoplefirstNeatLoudTTF;
    line-height: 170%;
    font-size: 20px;
    margin-top: 50px;
`;

const CustomButton = styled(Button)({
    marginTop: '50px !important',
    width: '200px',
    height: '50px',
    backgroundColor: '#E7F0DC !important',
    color: 'black !important',
    fontFamily: 'ChosunGu !important',
    borderRadius: '30px  !important',
});

const S = {
    Container,
    MissionBox,
    Title,
    ExplanText,
    ContentText,
    CustomButton,
};

export default S;
