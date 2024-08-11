import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    margin-top: 50px;
    font-size: 18px;
`;

const Section = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px; /* 섹션 높이를 조절하여 중앙 정렬 */
`;

const CommonWidth = '80%'; // 공통 width 설정

const SubSection = styled.div`
    margin-bottom: 50px;
    width: ${CommonWidth}; /* 공통 width 사용 */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px; /* 섹션 높이를 조절하여 중앙 정렬 */
    background: #116530;
`;

const Title = styled.h2`
    font-size: 2em;
    font-weight: bold;
    font-family: 'Noto-Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Subtitle = styled.h3`
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #ffffff; /* 폰트 색상 흰색으로 설정 */
`;

const Description = styled.p`
    font-size: 1.2em;
    margin: 10px 0;
    line-height: 1.6;
`;

const Arrow = styled.div`
    font-size: 3em;
    color: #006400; /* 화살표 색상 */
    margin: 20px 0;
`;

const Image = styled.img`
    width: 80%;
    height: auto;
    margin-top: 100px;
    margin-bottom: 20px;
`;

const BoxesContainer = styled.div`
    display: flex;
    justify-content: space-around; /* 요소들 사이에 적당한 간격을 줌 */
    width: ${CommonWidth}; /* 공통 width 사용 */
    background-color: #e9ecef;
`;

const Box = styled.div`
    padding: 20px;
    width: 300px;
    border-radius: 10px;
`;

const BoxTitle = styled.h4`
    display: flex;
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    background: #ffffff;
    border: 2px solid #006400;
    height: 50px;
    font-size: 1.2em;
    border-radius: 10px;
    margin-bottom: 15px;
`;

const BoxText = styled.p`
    font-size: 1em;
    color: #333;
    line-height: 1.8; /* 줄 간격을 넓혀 가독성 향상 */
    text-align: left; /* 텍스트를 왼쪽 정렬하여 가독성 향상 */
`;

const CurriculumImage = `${process.env.PUBLIC_URL}/img/CurriculumImage.png`;

function Curriculum() {
    return (
        <Container>
            <Section>
                <Title>새잎 교육 과정 소개</Title>
            </Section>

            <BoxesContainer>
                <Box>
                    <BoxTitle>코딩 교육 서비스</BoxTitle>
                    <BoxText>
                        • SSAFY 교육생들이 자립 준비 청년들에게 코딩 교육을
                        제공합니다.
                        <br />• 교육생들은 자신들이 배운 코딩 지식을 나누며,
                        자립 준비 청년들의 IT 역량 향상을 돕습니다.
                    </BoxText>
                </Box>
                <Box>
                    <BoxTitle>힐링 멘토링 서비스</BoxTitle>
                    <BoxText>
                        • 멘토링 팀은 함께 식물을 키우며 IT 공부와 고민 상담을
                        진행합니다.
                        <br />• 매주 멘토링 프로그램을 진행하며 서로를 격려하고
                        지원하는 프로그램입니다.
                    </BoxText>
                </Box>
                <Box>
                    <BoxTitle>자립 지원 프로그램</BoxTitle>
                    <BoxText>
                        • 이 서비스는 자립 준비 청년들의 자립을 돕는 것을 목표로
                        합니다.
                        <br />• 코딩 교육과 힐링 멘토링을 통해 청년들의 IT
                        역량과 정서적 안정을 도모합니다.
                    </BoxText>
                </Box>
            </BoxesContainer>
            <Arrow>↓</Arrow>

            <SubSection>
                <Subtitle>
                    자립 준비 청년들을 위한 코딩 교육 및 힐링 멘토링 서비스!
                </Subtitle>
            </SubSection>
            <Image src={CurriculumImage} alt="Curriculum Overview" />
        </Container>
    );
}

export default Curriculum;
