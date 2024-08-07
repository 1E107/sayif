import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Title = styled.div`
    font-family: ONE-Mobile-POP;
    font-size: 25px;
`;

const Container = styled.div`
    width: 1100px;
    margin: 60px 50px 30px 50px;
    height: 100%;
`;

const UploadButton = styled(Button)({
    fontFamily: 'ChosunGu !important',
    backgroundColor: '#116530 !important',
    borderRadius: '30px !important',
    padding: '10px !important',
    width: '120px',
    marginRight: '20px !important',
});

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const ExplanText = styled.div`
    font-family: ChosunGu;
    margin-right: 10px;
`;

const NextChallengeBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    color: '#116530 !important',
    fontWeight: 'bold !important',
});

const BottomWrapper = styled.div`
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
`;

const CardText = styled.div`
    font-family: ChosunGu;
    font-size: 17px;
    margin-bottom: 10px;
`;

const S = {
    Title,
    Container,
    UploadButton,
    TopWrapper,
    BottomWrapper,
    CardText,
    ExplanText,
    NextChallengeBtn,
};

export default S;
