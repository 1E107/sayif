import styled from "styled-components";
import '../../../../styles/fonts.css'

const Container = styled.div`
    margin-top: 50px;
    padding-right: 60px;
    padding-left: 10px;
    align-items: center;
`;

const Wrapper = styled.div`
    margin: 50px;
`;

const explanText = styled.div`
    color: black;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
`;

const changeBtnText = styled.div`
    font-size: 18px;
    background-color: #D4E3DA;
    color: #116530;
    padding: theme.spacing(1);
    textAlign: center;
    height: 50px;
    font-family: ChosunGu;
`

const MentorListBox = styled.div`
  background-color: #F5F5F5;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`

const MentorInfoTitle = styled.div`
    font-size: 10px;
    color: gray;
    font-family: ChosunGu;
`

const MentorInfoContent = styled.div`
    font-size: 18px;
    font-weight: bold;
    font-family: ChosunGu;
    margin-top: 10px;
`;

const MentorInfoBox = styled.div`
    margin-left: 50px;
    margin-right: 50px;
`;

const S = {
    Container,
    Wrapper,
    explanText,
    changeBtnText,
    MentorListBox,
    MentorInfoTitle,
    MentorInfoContent,
    MentorInfoBox
};

export default S;