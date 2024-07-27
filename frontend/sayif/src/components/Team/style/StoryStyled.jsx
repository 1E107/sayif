import styled from "styled-components";
import Button from '@mui/material/Button';
import '../../../styles/fonts.css'

const Main = styled.div`

`

const Container = styled.div`
    background-color: white;
    height: 800px;
    width: 1300px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    margin-top: 80px;
`
const CustomImg = styled.img`
    width: 150px;
    height: 150px;
    margin: 10px;
`;

const PostItWrapper = styled.div`
    text-align: center;
`

const CustomButton = styled(Button)({
    marginBottom: "50px !important",
    color: "#116530CC !important",
    border: "solid 1px #116530CC !important",
    borderRadius: "15px !important",
    fontFamily: "ChosunGu !important",
    fontWeight: "bold !important",
    fontSize: "17px !important",
    marginRight: "10px !important",
})

const S = {
    Container,
    CustomImg,
    PostItWrapper,
    CustomButton,
    Main,
}

export default S;