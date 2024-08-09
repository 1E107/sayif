import styled from 'styled-components';
import '../../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
    min-width: 1000px;
    min-height: 700px;
    background-color: white;
    border-radius: 30px;
    text-align: center;
`;

const Title = styled.div`
    margin-top: 50px;
    font-size: 35px;
    font-family: ChosunGu;
    font-weight: bold;
`;

const DateAndWriter = styled.div`
    margin-top: 25px;
    font-size: 20px;
    color: gray;
    font-family: ChosunGu;
`;

const CustomHr = styled.hr`
    margin: 30px;
    background: #e9ecef;
    height: 1px;
    border: 0;
`;
const Content = styled.div`
    text-align: left;
    font-size: 18px;
    min-height: 300px;
    margin: 50px;
    color: #343a40;
    font-family: ChosunGu;
`;

const CommentTitle = styled.div`
    font-size: 18px;
    text-align: left;
    padding-left: 60px;
    font-family: ChosunGu;
`;

const CommentBox = styled.div`
    min-height: 130px;
    font-family: ChosunGu;
    text-align: left;
    padding-left: 60px;
`;

const CommentItem = styled.div`
    margin-bottom: 25px;
`;

const CommentDate = styled.span`
    margin-left: 10px;
    font-size: 13px;
    color: gray;
`;

const CommentContent = styled.div`
    margin-top: 10px;
    font-size: 14px;
    line-height: 130%;
`;

const CommentList = styled.div``;

const CustomButton = styled(Button)({
    height: '50px',
    borderRadius: '15px !important',
    backgroundColor: '#F2F2EF !important',
    marginRight: '25px !important',
    color: 'black !important',
    fontFamily: 'ChosunGu !important',
});

const CommentWriteBox = styled.textarea`
    margin-top: 30px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 1000px;
`;

const S = {
    Container,
    Title,
    DateAndWriter,
    CustomHr,
    Content,
    CommentTitle,
    CommentBox,
    CommentDate,
    CommentContent,
    CommentWriteBox,
    CommentList,
    CustomButton,
    CommentItem,
};

export default S;
