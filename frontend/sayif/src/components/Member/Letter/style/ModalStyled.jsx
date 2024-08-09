import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Text = styled.div`
    font-family: ChosunGu;
    margin: 20px;
`;

const SendBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    fontSize: '17px !important',
    backgroundColor: '#116530 !important',
});

const InputTitle = styled.textarea`
    width: 550px;
    font-family: ChosunGu;
    font-size: 17px;
    margin-bottom: 15px;
    resize: none;
    padding: 5px;
`;

const InputContent = styled.textarea`
    width: 550px;
    font-family: ChosunGu;
    font-size: 17px;
    height: 150px;
    margin-bottom: 15px;
    resize: none;
    padding: 5px;
`;

const S = {
    Text,
    SendBtn,
    InputTitle,
    InputContent,
};
export default S;
