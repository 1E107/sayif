import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Title = styled.div`
    font-family: ChosunGu;
    background-color: #116530;
    padding: 10px;
    border-radius: 13px;
    color: white;
    margin-bottom: 15px;
`;

const PostBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    width: '130px',
    color: '#116530 !important',
    border: '1px solid #116530 !important',
    marginBottom: '30px !important',
    marginTop: '20px !important',
});

const FinishBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    width: '130px',
    marginBottom: '30px !important',
    marginTop: '20px !important',
    backgroundColor: '#116530 !important',
    marginLeft: '10PX !important',
});

const ExplainText = styled.div`
    font-family: ChosunGu;
    font-size: 12px;
    margin-top: 5px;
    line-height: 130%;
`;

const ResultText = styled.div`
    font-family: ChosunGu;
    font-size: 14px;
    line-height: 140%;
`;

const ResultHigh = styled.span`
    color: #ba9c03;
`;

const S = {
    Title,
    PostBtn,
    ResultText,
    ResultHigh,
    ExplainText,
    FinishBtn,
};

export default S;
