import React, { useEffect, useRef } from 'react';
import S from "./styled";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Main() {
    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);

    const scrollToSection = (index) => {
        if (index >= 0 && index < sectionsRef.current.length) {
            sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 맨 위로 스크롤
        window.scrollTo(0, 0);

        const handleScroll = () => {
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                const scrollPos = window.scrollY + window.innerHeight / 2;
                const index = sectionsRef.current.findIndex(
                    (section) =>
                        section.offsetTop <= scrollPos &&
                        section.offsetTop + section.clientHeight > scrollPos
                );
                if (index !== -1) {
                    scrollToSection(index);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, []);

    return (
        <>  
            {/* First section */}
            <S.MainTop ref={(el) => (sectionsRef.current[0] = el)} style={{ paddingTop: "50px" }}>
                <S.GifContainer>
                    <img src={`${process.env.PUBLIC_URL}/gif/랜딩_새잎.gif`} alt="세잎클로버 GIF" />
                </S.GifContainer>
                <S.MainTopTitle>청년이 청년에게, <br /> 함께하는 IT 멘토링</S.MainTopTitle>
                <S.MainText style={{ marginTop: "40px" }}>바로 이 곳<br />새잎에서</S.MainText>
                <S.HoverIcon onClick={() => scrollToSection(1)} />
            </S.MainTop>
            
            {/* Second section */}
            <S.MainTop ref={(el) => (sectionsRef.current[1] = el)} id="nextSection">
                <S.MainText style={{ color: "#0B4619", marginTop: "30px", fontSize: "28px" }}>
                    쉽고 재미있는 IT 교육으로 새로운 가능성을 발견하세요. <br />
                    청년 멘토와 같이 성장하고 꿈을 키워나가며, <br />
                    자유롭게 소통하고 정보를 공유하세요. <br />
                </S.MainText>
            </S.MainTop>

            {/* Third section */}
            <S.MainSplitSection ref={(el) => (sectionsRef.current[2] = el)}>
                <S.VideoContainer>
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/8owhox1bPWw" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </S.VideoContainer>
            </S.MainSplitSection>

            {/* 4 section */}
            <S.MainMiddle ref={(el) => (sectionsRef.current[3] = el)}>
                <S.SectionContent>중간 섹션 내용</S.SectionContent>
            </S.MainMiddle>
            
            <S.MainBottom ref={(el) => (sectionsRef.current[4] = el)}>
                <S.SectionContent>하단 섹션 내용</S.SectionContent>
            </S.MainBottom>
        </>
    );
}

export default Main;
