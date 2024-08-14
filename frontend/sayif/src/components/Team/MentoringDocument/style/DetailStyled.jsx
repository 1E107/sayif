import styled from 'styled-components';
import '../../../../styles/fonts.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  min-width: 1000px;
  min-height: 700px;
  background-color: white;
  border-radius: 30px;
  text-align: center;
  position: relative;
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

const BackButton = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  color: #116530;
  font-family: ChosunGu;
`;

const BackIcon = styled(ArrowBackIosIcon)`
  font-size: 24px;
  margin-right: 8px;
`;

const FileDownloadButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  margin-top: 20px;
  background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #45a049 0%, #2e7d32 100%);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(135deg, #397d39 0%, #255d24 100%);
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }
`;

const S = {
    Container,
    Title,
    DateAndWriter,
    CustomHr,
    Content,
    BackButton,
    BackIcon, // BackIcon 추가
    FileDownloadButton,
};

export default S;
