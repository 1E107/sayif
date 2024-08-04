import styled from "styled-components";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../../styles/fonts.css'

const Container = styled.div`
    width: 1000px;
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const CustomTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "20px",
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1px solid #dee2e6',
            borderRadius: '20px'
        },
        '&:hover fieldset': {
            border: '1px solid #dee2e6',
            borderRadius: '20px'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #dee2e6',
            borderRadius: '20px'
        },
        '& input' : {
            padding: '7px',
        }
    },
});

const SearchButton = styled(Button)({
    backgroundColor: "#116530 !important",
    borderRadius: "20px !important",
    marginBottom: "40px !important",
    padding: "5px !important",
    fontFamily: "ChosunGu !important",
    marginLeft: "5px !important",
});

const WriteButton = styled(Button)({
    marginBottom: "40px !important",
    width: "100px",
    marginLeft: "10px !important",
    fontFamily: "ChosunGu !important",
    borderRadius: "20px !important",
    color: "#116530 !important",
    border: "solid 1px #116530 !important",
    fontWeight: "bold !important"
})

const S = {
    Container,
    HeaderWrapper,
    CustomTextField,
    SearchButton,
    WriteButton,
}

export default S;