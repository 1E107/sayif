import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../../../styles/fonts.css';

const Container = styled.div`
    margin: 70px 20px 50px 20px;
`;

const CustomButton = styled(Button)({
    backgroundColor: '#116530 !important',
    borderRadius: '13px !important',
    padding: '5px !important',
    margin: '0px 10px 10px 0px !important',
    fontFamily: 'ChosunGu !important',
    fontSize: '15px !important',
});

const SearchButton = styled(Button)({
    backgroundColor: '#116530 !important',
    borderRadius: '20px !important',
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

const S = {
    Container,
    CustomButton,
    SearchButton,
    CustomTextField,
};

export default S;
