import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    width: 600px;
    height: 700px;
    margin: 150px 0px 100px 50px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const ItemWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    font-family: ChosunGu;
    color: #116530;
    margin-right: 30px;
    width: 60px;
`;

const CustomTextField = styled(TextField)(({ hasError }) => ({
    width: '350px',
    backgroundColor: '#E8E8CCB2',
    '& .MuiFormHelperText-root': {
        backgroundColor: 'white',
        width: '350px',
        margin: '0px',
    },
}));

const CustomBtn = styled(Button)({
    width: '130px',
    marginRight: '10px !important',
    marginLeft: '10px !important',
    color: '#116530 !important',
    border: '1px solid #116530 !important',
    fontFamily: 'ChosunGu !important',
});

const RegistBtn = styled(Button)({
    marginTop: '30px !important',
    width: '200px',
    height: '45px',
    backgroundColor: '#116530 !important',
    fontFamily: 'ChosunGu !important',
});

const IdChecktBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    border: '1px solid #116530 !important',
    marginLeft: '10px !important',
    color: '#116530 !important',
});

const S = {
    Container,
    Text,
    CustomTextField,
    ItemWrapper,
    CustomBtn,
    RegistBtn,
    IdChecktBtn,
};

export default S;
