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

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    margin-top: 100px;
    max-width: 500PX;
    max-height: 500PX;
    img {
        width: 100%;
        height: auto;
    }
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

const ModalText = styled.div`
    position: absolute;
    top: 40%;
    margin-left: 55px;
    width: 400px;
    font-family: ChosunGu;
    line-height: 1.5em;
`

const S = {
    Container,
    CustomImg,
    PostItWrapper,
    CustomButton,
    Main,
    Modal,
    ModalContent,
    ModalText
}

export default S;