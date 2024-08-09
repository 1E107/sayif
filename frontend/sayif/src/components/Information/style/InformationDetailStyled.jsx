import styled from 'styled-components';
import '../../../styles/fonts.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: #116530;
  font-family: ONE-Mobile-POP;
  font-size: 30px;
  margin-top: 130px;
`;

const Line = styled.hr`
  margin-top: 15px;
  width: 210px;
  border-top: 2px solid #116530;
  margin-bottom: 50px;
`;

const Form = styled.div`
  height: 800px;
  width: 700px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 100px;
  border-radius: 30px;
`;

const CustomImg = styled.img`
  width: 300px;
  height: 350px;
  border-radius: 20px;
`;

const TitleText = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  font-family: ChosunGu;
  font-size: 22px;
  line-height: 150%;
  font-weight: bold;
`;

const ContentText = styled.div`
  margin-left: 25px;
  margin-top: 40px;
  font-family: ChosunGu;
`;

const Button = styled.button`
  background-color: #116530; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const S = {
    Container,
    Title,
    Line,
    Form,
    CustomImg,
    TitleText,
    ContentText,
    Button,
    ButtonContainer,
};

export default S;