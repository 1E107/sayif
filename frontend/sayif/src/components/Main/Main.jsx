import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from "./styled";
import Footer from "./Footer"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Main = () => {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);
    const footerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);

    const contents = [
        { type: 'profile', content: <MentorProfileContent />, link: '/mentor-profile' },
        { type: 'apply', content: <MentoringApplyContent />, link: '/apply-mentoring' },
        { type: 'team', content: <TeamOfficeContent />, link: '/team' },
        { type: 'mentoring', content: <MentoringVideoContent />, link: '/team/meeting' }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % contents.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + contents.length) % contents.length);
    };

    const handleSlideClick = (link) => {
        navigate(link);
    };

    const scrollToSection = (index) => {
        if (index >= 0 && index < sectionsRef.current.length) {
            sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                const scrollPos = window.scrollY + window.innerHeight;
                const footerPos = footerRef.current ? footerRef.current.offsetTop : Infinity;

                // Footer에 도달하지 않았을 때만 스크롤 스냅 적용
                if (scrollPos < footerPos) {
                    const index = sectionsRef.current.findIndex(
                        (section) =>
                            section.offsetTop <= window.scrollY + window.innerHeight / 2 &&
                            section.offsetTop + section.clientHeight > window.scrollY + window.innerHeight / 2
                    );
                    if (index !== -1) {
                        scrollToSection(index);
                    }
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, []);


    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px', // 뷰포트의 20% 만큼 더 내려와야 감지됨
            threshold: 0.5 // 요소의 50%가 보여야 감지됨
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    setTimeout(() => {
                        target.classList.add('visible');
                    }, target.dataset.delay); // 요소에 설정된 지연 시간 사용

                    observer.unobserve(target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const animatedElements = document.querySelectorAll('.animated-element');
        animatedElements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            animatedElements.forEach(element => observer.unobserve(element));
        };
    }, []);

    useEffect(() => {
        slideInterval.current = setInterval(() => {
            nextSlide();
        }, 8000); // 8초마다 슬라이드 변경

        return () => {
            clearInterval(slideInterval.current);
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
                <S.ImageWrapper className="animated-element" data-delay="500">
                    <S.MainText style={{ color: "#0B4619", marginTop: "30px", fontSize: "28px" }}>
                        쉽고 재미있는 IT 교육으로 새로운 가능성을 발견하세요. <br />
                        청년 멘토와 같이 성장하고 꿈을 키워나가며, <br />
                        자유롭게 소통하고 정보를 공유하세요. <br />
                    </S.MainText>
                </S.ImageWrapper>
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

            {/* Fourth section */}
            <S.MainMiddle ref={(el) => (sectionsRef.current[3] = el)}>
                <S.SliderContainer>
                    <S.SliderArrow onClick={prevSlide}>
                        <ArrowBackIosIcon />
                    </S.SliderArrow>
                    <S.SlideContent 
                        key={currentSlide}
                        onClick={() => handleSlideClick(contents[currentSlide].link)}
                    >
                        {contents[currentSlide].content}
                    </S.SlideContent>
                    <S.SliderArrow onClick={nextSlide}>
                        <ArrowForwardIosIcon />
                    </S.SliderArrow>
                </S.SliderContainer>
            </S.MainMiddle>
            
             {/* Fifth section */}
             <S.InformationSection ref={(el) => (sectionsRef.current[4] = el)}>
                <S.ImageWrapper className="animated-element" data-delay="500">
                    <img style={{ width: "32%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/퀴즈 설명.png`} alt="Quiz Description" />
                </S.ImageWrapper>
                <S.ImageWrapper className="animated-element" data-delay="1000">
                    <img style={{ width: "63%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/퀴즈 내용.png`} alt="Quiz Content" />
                </S.ImageWrapper>
            </S.InformationSection>

            
             {/* Sixth section */}
             <S.InformationSection ref={(el) => (sectionsRef.current[5] = el)}>
                <S.ImageWrapper className="animated-element" data-delay="500">
                    <img style={{ width: "26%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/자립 설명.png`} alt="Quiz Description" />
                </S.ImageWrapper>
                <S.ImageWrapper className="animated-element" data-delay="1000">
                    <img style={{ width: "65%", marginTop: "10px"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/자립 내용.png`} alt="Quiz Content" />
                </S.ImageWrapper>
            </S.InformationSection>

            {/* Seventh section */}
            <S.InformationSection ref={(el) => (sectionsRef.current[6] = el)}>
                <S.ImageWrapper className="animated-element" data-delay="500">
                    <img style={{ width: "28%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/챗봇 설명.png`} alt="Quiz Description" />
                </S.ImageWrapper>
                <S.ImageWrapper className="animated-element" data-delay="1000">
                    <img style={{ width: "31%", margin: "9px 0px 0px 0px"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/챗봇 내용.png`} alt="Quiz Content" />
                </S.ImageWrapper>
            </S.InformationSection>

            {/* Eighth section */}
            <S.MainBottom ref={(el) => (sectionsRef.current[7] = el)}>
                <S.VideoBackground autoPlay loop muted>
                    <source src={`${process.env.PUBLIC_URL}/video/team.mp4`} type="video/mp4" />
                </S.VideoBackground>
                <S.Overlay />
                <S.SectionContent style={{ color: "white", zIndex: 2 }}>
                    나눔의 가치를 실천하며 더 나은 미래를 만들어 갑니다. <br />함께 가요 미래로! Enabling People
                </S.SectionContent>
            </S.MainBottom>

            <div ref={footerRef}>
                <Footer />
            </div>
        </>
    );
}

const MentorProfileContent = () => (
    <S.ContentWrapper style={{ marginRight: "120px" }}>
        <S.Image style={{ width: "150%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/프로필 카드 소개.png`} alt="프로필 이미지" />
    </S.ContentWrapper>
);

const MentoringApplyContent = () => (
    <S.ContentWrapper style={{ marginRight: "95px" }}>
        <S.Image style={{ width: "120%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/멘토링 신청.png`} alt="캘린더 이미지" />
    </S.ContentWrapper>
);

const TeamOfficeContent = () => (
    <S.ContentWrapper style={{ marginRight: "200px" }}>
        <S.Image style={{ width: "150%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/팀 오피스.png`} alt="선인장 이미지" />
    </S.ContentWrapper>
);

const MentoringVideoContent = () => (
    <S.ContentWrapper style={{ margin: "30px 120px 0px 0px" }}>
        <S.Image style={{ width: "120%"}} src={`${process.env.PUBLIC_URL}/img/LandingPage/화상 멘토링.png`} alt="스크래치 이미지" />
    </S.ContentWrapper>
);

export default Main;
