import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from "./styled";
import Footer from "./Footer";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getTeamStatue } from '../../api/MentoringApi';
import { useSelector } from 'react-redux';

const Main = () => {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);
    const footerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);
    const { token, member } = useSelector(state => state.member);

    const contents = [
        { type: 'profile', content: <MentorProfileContent />},
        { type: 'apply', content: <MentoringApplyContent />},
        { type: 'team', content: <TeamOfficeContent />},
        { type: 'mentoring', content: <MentoringVideoContent />}
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % contents.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + contents.length) % contents.length);
    };

    const handleImageClick = async (link) => {
        if (link === '/mentor-profile' || link === '/apply-mentoring') {
            navigate(link);
            return;
        }

        if (!token) {
            alert('로그인 후 이용해 주세요');
            navigate('/member/login');
            return;
        }

        if (link === '/team/meeting') {
            await handleTeamPage();
        } else {
            navigate(link);
        }
    };

    const handleTeamPage = async () => {
        if (member.teamId) {
            try {
                const response = await getTeamStatue(member.teamId, token);
                if (response.status === 200) {
                    if (response.data.status === 'Proceed') {
                        navigate('/team');
                    } else {
                        alert('팀 오피스가 활성화 되지 않았습니다');
                        navigate('/');
                    }
                }
            } catch (error) {
                console.log(error);
                navigate('/login'); // 오류가 발생하면 로그인 페이지로 이동
            }
        } else {
            navigate('/login'); // 팀 ID가 없으면 로그인 페이지로 이동
        }
    };

    const scrollToSection = (index) => {
      if (index >= 0 && index < sectionsRef.current.length) {
          const yOffset = -50; // 헤더의 높이나 원하는 오프셋 값
          const element = sectionsRef.current[index];
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
      }
    };

    useEffect(() => {
      let lastScrollTop = 0;
      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollPos = scrollTop + window.innerHeight / 2;
          const footerPos = footerRef.current ? footerRef.current.offsetTop : Infinity;
    
          // Footer에 도달하지 않았을 때만 스크롤 스냅 적용
          if (scrollPos < footerPos - window.innerHeight / 2) {
            let closestSectionIndex = 0;
            let minDistance = Infinity;
    
            sectionsRef.current.forEach((section, index) => {
              const distance = Math.abs(section.offsetTop - scrollPos);
              if (distance < minDistance) {
                minDistance = distance;
                closestSectionIndex = index;
              }
            });
    
            // 스크롤 방향 확인
            if (scrollTop > lastScrollTop) {
              // 아래로 스크롤
              scrollToSection(closestSectionIndex);
              lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
            } else {
              // 위로 스크롤
              scrollToSection(Math.max(0, closestSectionIndex - 1));
              lastScrollTop = scrollTop <= 0 ? 0 : closestSectionIndex - 1; 
            }
          }
        }, 100); // 타임아웃을 100ms로 조정
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
            rootMargin: '0px',
            threshold: 0.1 
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
                {/* <S.SliderArrow onClick={prevSlide}>
                    <ArrowBackIosIcon />
                </S.SliderArrow> */}
                <S.SliderContainer>
                    <S.SlideContent key={currentSlide}>
                        <div>
                            {contents[currentSlide].type === 'profile' && (
                                <MentorProfileContent handleImageClick={handleImageClick} />
                            )}
                            {contents[currentSlide].type === 'apply' && (
                                <MentoringApplyContent handleImageClick={handleImageClick} />
                            )}
                            {contents[currentSlide].type === 'team' && (
                                <TeamOfficeContent handleImageClick={handleImageClick} />
                            )}
                            {contents[currentSlide].type === 'mentoring' && (
                                <MentoringVideoContent handleImageClick={handleImageClick} />
                            )}
                        </div>
                    </S.SlideContent>
                    <S.Indicators>
                        {contents.map((_, index) => (
                            <S.Dot
                                key={index}
                                isActive={index === currentSlide}
                                onClick={() => setCurrentSlide(index)} // Dot 클릭 시 해당 슬라이드로 이동
                            />
                        ))}
                    </S.Indicators>
                </S.SliderContainer>
                {/* <S.SliderArrow onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </S.SliderArrow> */}
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

const MentorProfileContent = ({ handleImageClick }) => (
  <S.ContentWrapper style={{flexDirection: "row", marginTop: "25px"}}>
      {/* 프로필 이미지 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/mentor-profile/이미지.png`} style={{width: "380px", marginRight: "50px", marginLeft: "110px"}} alt="멘토 프로필 이미지" />
      
      <div style={{display: "flex", flexDirection: "column"}}>
        {/* 멘트 */}
        <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/mentor-profile/멘트.png`} style={{width: "490px", marginBottom: "50px", marginTop: "10px"}} alt="멘토 프로필 기능 설명" />

        {/* 하단 버튼 */}
        <S.Image
            src={`${process.env.PUBLIC_URL}/img/LandingPage/mentor-profile/바로가기.png`}
            onClick={() => handleImageClick('/mentor-profile')}
            style={{width: "290px"}}
            alt="멘토 프로필 바로가기"
            clickable // 이 prop을 추가하면 커서가 포인터로 변경됨
        />
      </div>
  </S.ContentWrapper>
);

const MentoringApplyContent = ({ handleImageClick }) => (
  <S.ContentWrapper style={{flexDirection: "column", marginTop: "40px"}}>
      {/* 멘트 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/apply-mentoring/멘트.png`} style={{width: "570px", marginRight: "40px"}} alt="멘토링 신청 기능 설명" />
      
      {/* 프로필 이미지 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/apply-mentoring/이미지.png`} style={{width: "720px", marginRight: "40px", marginTop: "35px"}} alt="멘토링 신청 이미지" />
  
      {/* 하단 버튼 */}
      <S.Image
          src={`${process.env.PUBLIC_URL}/img/LandingPage/apply-mentoring/바로가기.png`}
          onClick={() => handleImageClick('/apply-mentoring')}
          style={{width: "300px", marginRight: "40px", marginTop: "35px"}}
          alt="멘토링 신청 바로가기"
          clickable // 이 prop을 추가하면 커서가 포인터로 변경됨
      />
  </S.ContentWrapper>
);

const TeamOfficeContent  = ({ handleImageClick }) => (
  <S.ContentWrapper style={{flexDirection: "row", marginTop: "25px"}}>
      {/* 프로필 이미지 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/team-office/이미지.png`} style={{width: "380px", marginRight: "20px", marginLeft: "90px"}} alt="팀 오피스 이미지" />
      
      <div style={{display: "flex", flexDirection: "column"}}>
        {/* 멘트 */}
        <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/team-office/멘트.png`} style={{width: "490px", marginBottom: "50px", marginTop: "10px"}} alt="팀 오피스 기능 설명" />

        {/* 하단 버튼 */}
        <S.Image
            src={`${process.env.PUBLIC_URL}/img/LandingPage/team-office/바로가기.png`}
            onClick={() => handleImageClick('/team')}
            style={{width: "270px"}}
            alt="팀 오피스 바로가기"
            clickable // 이 prop을 추가하면 커서가 포인터로 변경됨
        />
      </div>
  </S.ContentWrapper>
);

const MentoringVideoContent = ({ handleImageClick }) => (
  <S.ContentWrapper style={{flexDirection: "column", marginTop: "40px"}}>
      {/* 멘트 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/mentoring/멘트.png`} style={{width: "560px", marginRight: "40px"}} alt="멘토링 기능 설명" />
      
      {/* 프로필 이미지 */}
      <S.Image src={`${process.env.PUBLIC_URL}/img/LandingPage/mentoring/이미지.png`} style={{width: "720px", marginRight: "40px", marginTop: "20px"}} alt="멘토링 이미지" />
  
      {/* 하단 버튼 */}
      <S.Image
          src={`${process.env.PUBLIC_URL}/img/LandingPage/mentoring/바로가기.png`}
          onClick={() => handleImageClick('/team/meeting')}
          style={{width: "280px", marginRight: "40px", marginTop: "20px"}}
          alt="멘토링 바로가기"
          clickable // 이 prop을 추가하면 커서가 포인터로 변경됨
      />
  </S.ContentWrapper>
);

export default Main;
