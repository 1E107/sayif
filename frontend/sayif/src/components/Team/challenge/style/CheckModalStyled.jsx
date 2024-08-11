import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../../styles/fonts.css';

const Content = styled.div`
    font-family: ChosunGu;
    font-size: 18px;
    margin-bottom: 20px;
`;

const Title = styled.div`
    font-family: ChosunGu;
    color: #e8e8cc;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 50px;
    background-color: #116530;
    padding: 13px;
    border-radius: 10px;
`;

const SubmitButton = styled(Button)({
    marginTop: '30px !important',
    fontFamily: 'ChosunGu !important',
    color: '#116530 !important',
    fontWeight: 'bold !important',
    border: '1px solid #116530 !important',
});

const S = {
    Content,
    SubmitButton,
    Title,
};

export default S;
