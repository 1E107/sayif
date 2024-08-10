import styled from "styled-components";
import '../../styles/fonts.css';

// 스타일드 컴포넌트 정의
const Container = styled.div`
    background-color: #116530;
    text-align: center;
    padding: 80px 0 60px 0;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    color: #fff;
    font-size:18px;
    font-family: 'Noto-Sans', sans-serif; /* 기본 폰트를 설정 */
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: left;
    padding: 0 30px;
    margin: 30px 120px 0 100px;
    height:405px;
`;

const TextContainer = styled.div`
    flex: 4;
    padding-right: 20px;
    text-align: left;
`;

const ImageContainer = styled.div`
    flex: 5;
    text-align: right;
`;

const Title = styled.h1`
    font-size: 3.0em;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
`;

const SubTitle = styled.h2`
    font-size: 2.5em;
    font-weight: bold;
    color: #000000;
    font-family:'Freesentation-9Black';
`;

const Description = styled.p`
    font-size: 1.5em;
    color: #000000;
    margin-bottom: 40px;
    font-family:'NanumBarunpen';
`;

const Image = styled.img`
    width: 100%;
    height: 90%;
    object-fit: contain;
`;

const LinkContainer = styled.div`
    margin-top: 20px;
`;

const Link = styled.a`
    font-size: 0.92em;
    color: #007BFF;
    margin: 0 10px;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;

const S = {
    Container,
    ContentContainer,
    TextContainer,
    ImageContainer,
    Title,
    SubTitle,
    Description,
    Image,
    Link,
    LinkContainer,
};

export default S;
