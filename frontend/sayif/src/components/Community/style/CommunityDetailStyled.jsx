import styled from 'styled-components';
import '../../../styles/fonts.css';
import Button from '@mui/material/Button';

const Container = styled.div`
  margin-top: 400px; /* Adjust margin-top to ensure it doesn't get hidden behind header */
  margin-bottom: 100px;
  min-width: 1000px;
  min-height: 700px;
  background-color: white;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
    font-size: 20px;
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
    font-size: 14px;
    color: gray;
`;

const CommentContent = styled.div`
    margin-top: 10px;
    font-size: 17px;
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
    fontSize: '16px !important',
});

const CommentWriteBox = styled.textarea`
    margin-top: 30px;
    font-size: 18px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 1000px;
`;

const CommentEditBox = styled.textarea`
    margin-top: 30px;
    font-size: 18px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 90%;
`;

const LoadingText = styled.div`
    font-family: ChosunGu;
    margin-bottom: 50px;
`;

const SmallButton = styled(Button)({
    height: '30px',
    borderRadius: '15px !important',
    backgroundColor: '#F2F2EF !important',
    marginRight: '25px !important',
    color: 'black !important',
    fontFamily: 'ChosunGu !important',
});

// 추가된 스타일
const Fieldset = styled.fieldset`
  border: 2px solid #ddd;
  padding: 0;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const Legend = styled.legend`
  display: block;
  text-align: center;
  font-weight: bold;
  padding: 0 10px;
  border-bottom: 2px solid #ddd;
  margin: 0;
  cursor: pointer; /* 클릭 가능하게 스타일 추가 */
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
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
    CommentEditBox,
    LoadingText,
    SmallButton,
    Fieldset,
    Legend,
    ImageContainer,
    Image,
};

export default S;
