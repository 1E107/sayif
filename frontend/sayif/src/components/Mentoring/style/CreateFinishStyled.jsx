import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;
    height: 500px;
    margin-top: 230px;
    margin-right: 90px;
`

const Title = styled.div`
    font-family: Freesentation-9Black;
    font-size: 45px;
    margin-top: 10px;
`

const Content = styled.div`
    text-align: center;
    margin-top: 50px;
    font-family: ChosunGu;
    line-height: 150%;
    font-size: 19px;
`

const CustomBtn = styled(Button)({
    width: "200px",
    marginTop: "50px !important",
    backgroundColor: "#116530 !important",
    fontFamily: "ChosunGu !important"
})

const S = {
    Container,
    Title,
    Content,
    CustomBtn
}

export default S;