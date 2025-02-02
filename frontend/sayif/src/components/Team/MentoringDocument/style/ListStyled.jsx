import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../../../styles/fonts.css';

const Container = styled.div`
    margin: 70px 20px 50px 20px;
`;

const Title = styled.div`
    font-family: ChosunGu;
    font-size: 24px;
    font-weight: bold;
    color: #0b4619;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const CustomButton = styled(Button)({
    backgroundColor: '#116530 !important',
    borderRadius: '13px !important',
    padding: '5px !important',
    margin: '10px 0px 0px 5px !important',
    fontFamily: 'ChosunGu !important',
});

const SearchButton = styled(Button)({
    backgroundColor: '#116530 !important',
    borderRadius: '20px !important',
    marginBottom: '40px !important',
    padding: '5px !important',
    fontFamily: 'ChosunGu !important',
    marginLeft: '5px !important',
});

const CustomTextField = styled(TextField)({
    backgroundColor: 'white',
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
        '& input': {
            padding: '7px',
        },
    },
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
    CustomButton,
    SearchButton,
    CustomTextField,
    FloatingButton,
    Title,
};

export default S;
