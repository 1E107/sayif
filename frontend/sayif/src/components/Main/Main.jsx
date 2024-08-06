import React from 'react';
import S from "./styled";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Main() {
    // Function to scroll to the next section
    const scrollToNext = () => {
        const nextSection = document.getElementById('nextSection');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const MainView = (
        <>
            <S.MainTop style={{ marginTop: "50px" }}>
                <S.GifContainer>
                    <img src={`${process.env.PUBLIC_URL}/gif/랜딩_새잎.gif`} alt="세잎클로버 GIF" />
                </S.GifContainer>
                <S.MainTopTitle>청년이 청년에게, <br /> 함께하는 IT 멘토링</S.MainTopTitle>
                <S.MainText style={{ marginTop: "40px" }}>바로 이 곳<br />새잎에서</S.MainText>
                <S.HoverIcon onClick={scrollToNext} />
            </S.MainTop>
            <S.MainTop id="nextSection">
                <S.MainText style={{ color: "#0B4619", marginTop: "30px", fontSize: "28px" }}>
                    쉽고 재미있는 IT 교육으로 새로운 가능성을 발견하세요. <br />
                    청년 멘토와 같이 성장하고 꿈을 키워나가며, <br />
                    자유롭게 소통하고 정보를 공유하세요. <br />
                </S.MainText>
            </S.MainTop>
            <S.MainMiddle>
                {/* Add content for MainMiddle if necessary */}
                <S.SectionContent>중간 섹션 내용</S.SectionContent>
            </S.MainMiddle>
            <S.MainBottom>
                {/* Add content for MainBottom if necessary */}
                <S.SectionContent>하단 섹션 내용</S.SectionContent>
            </S.MainBottom>
        </>
    );

    return MainView;
}

export default Main;
