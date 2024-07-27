import styled from "styled-components";
import '../../../styles/fonts.css'

const Container = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
    background-color: white;
    height: 800px;
    width: 1300px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const SendChatWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ChatContentWrapper = styled.div`
    height: 600px;
    width: 1100px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-right: 110px;
    overflow-y: auto;
`

const ProfileImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100px;
    margin: 5px;
`

const ChatContent = styled.div`
    margin: 10px;
    border: 1px solid #116530;
    width: 700px;
    height: 50px;
    border-radius: 10px;
    padding: 15px;
    font-family: ChosunGu;
`

const OtherInfoText = styled.div`
    font-family: ChosunGu;
    margin-left: 20px;
`

const MyInfoText = styled.div`
    font-family: ChosunGu;
    margin-right: 25px;
`

const ChatOther = styled.div`
    width: 700px;
    height: 80px;
    margin: 20px;
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ChatMy = styled.div`
    width: 700px;
    height: 80px;
    margin: 20px;
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const S = {
    Container,
    SendChatWrapper,
    ChatContentWrapper,
    ChatOther,
    ChatMy,
    ProfileImg,
    ChatContent,
    OtherInfoText,
    MyInfoText,
}

export default S;