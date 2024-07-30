import styled from "styled-components";
import '../../../styles/fonts.css'

const Title = styled.div`
    color: #116530;
    font-family: ChosunGu;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 30px;
`;

const Container = styled.div`

`

const MentorList = styled.div`
    display: flex;
    gap: 100px;
`

const MentorNameText = styled.div`
    font-size: 20px;
    font-weight: bold;
    font-family: ChosunGu;
    margin-bottom: 10px;
`

const MentorInfoText = styled.div`
    font-family: ChosunGu;
    font-size: 13px;
`

const MentorExplan = styled.div`
    color: #116530;
    font-family: ChosunGu;
    line-height: 25px;
    font-size: 15px;
    margin-bottom: 20px;
`

const TagList = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`

const TagBox = styled.div`
    background-color: #161616;
    font-family: ChosunGu;
    color: white;
    padding: 4px;
    font-size: 12px;
    width: 50px;
    border-radius: 14px;
    text-align: center;
`

const MenteeList = styled.div`
    display: flex;
    gap: 30px;
`;

const MenteeCard = styled.div`
    background-color: white;
    height: 280px;
    width: 200px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MenteeImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 70%;
    margin-bottom: 30px;
`

const MenteeNickname = styled.div`
    text-align: center;
    font-family: ChosunGu;
    font-size: 25px;
    margin-top: 20px;
    color: #116530;
    font-weight: bold;
`

const S = {
    Title,
    Container,
    MentorNameText,
    MentorInfoText,
    MentorExplan,
    TagBox,
    TagList,
    MentorList,
    MenteeList,
    MenteeCard,
    MenteeImg,
    MenteeNickname
}

export default S;
