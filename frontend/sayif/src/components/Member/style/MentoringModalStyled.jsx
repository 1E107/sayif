import styled from "styled-components";
import '../../../styles/fonts.css';

const Title = styled.div`
    background-color: #116530;
    height: 40px;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: #E8E8CC;
    font-family: ChosunGu;
    padding: 5px;
    margin-bottom: 20px;
`

const ContentText = styled.div`
    font-family: ChosunGu;
    color: #116530;
    font-weight: bold;
    margin-bottom: 10px;
`

const Content = styled.div`
    background-color: #E8E8CCB2;
    border-radius: 10px;
`

const MentorNameText = styled.div`
    font-size: 18px;
    font-family: ChosunGu;
    margin-top: 10px;
    font-weight: bold;
`

const BottomWrapper = styled.div`
    
`

const ContentData = styled.div`
    background-color: #E8E8CCB2;
    height: 50px;
    width: 120px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
`

const S = {
    Title,
    Content,
    ContentText,
    BottomWrapper,
    ContentData,
    MentorNameText
}

export default S;