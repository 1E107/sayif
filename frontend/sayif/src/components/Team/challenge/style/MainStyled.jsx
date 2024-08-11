import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
    margin-top: 60px;
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
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ExplanText = styled.div`
    width: 550px;
    font-family: ChosunGu;
    font-size: 18px;
    line-height: 140%;
    margin-top: 10px;
`;

const ContentText = styled.div`
    width: 500px;
    font-family: PeoplefirstNeatLoudTTF;
    line-height: 170%;
    font-size: 24px;
    margin-top: 50px;
`;

const ExpText = styled.div`
    margin-top: 10px;
    font-family: ChosunGu;
    font-size: 15px;
    color: #999999;
`;

const CustomButton = styled(Button)({
    fontSize: '18px !important',
    fontWeight: 'bold !important',
    marginTop: '50px !important',
    width: '200px',
    height: '50px',
    backgroundColor: '#E7F0DC !important',
    color: 'black !important',
    fontFamily: 'ChosunGu !important',
    borderRadius: '30px  !important',
});

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
    Container,
    MissionBox,
    Title,
    ExplanText,
    ContentText,
    CustomButton,
    FloatingButton,
    ExpText,
};

export default S;
