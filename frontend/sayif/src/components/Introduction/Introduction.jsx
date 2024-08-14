import S from "./styled";
import ApplyPage from "../../pages/Mentoring/ApplyPage";
import { useSelector } from 'react-redux';

function Introduction() {
    const Main_URL = 'https://i11e107.p.ssafy.io/'
    const { token, member } = useSelector(state => state.member);
    const isMemberValid = member && Object.keys(member).length > 0;
    return (
        <>
        <S.Container>
            <S.Title>서비스 소개</S.Title>
        </S.Container>
        <S.ContentContainer>
            <S.TextContainer>
                <S.SubTitle>자립 준비 청년을 위한
                     SSAFY 교육생들의 IT 멘토링 서비스</S.SubTitle>
                <S.Description>
                    WebRTC 기반 교육, 챗봇 활용 복습, 커뮤니티 지원 및 IT 멘토링을 통해 자립 준비 청년의 
                    지식 향상과 정보 제공 서비스
                </S.Description>
                <S.LinkContainer>
                    <S.Link href="https://www.ssafy.com/">SSAFY 홈페이지 바로가기</S.Link>
                    {isMemberValid && (
                    <>
                        {member.role === "Mentee" && <S.Link href={`${Main_URL}apply-mentoring/`}>멘토링 신청 바로가기</S.Link>}
                        {member.role === "Mentor" && <S.Link href={`${Main_URL}create-mentoring/`}>멘토링 그룹 생성 바로가기</S.Link>}
                    </>
                    )}
                    </S.LinkContainer>
            </S.TextContainer>
            <S.ImageContainer>
                <S.Image src={`${process.env.PUBLIC_URL}/service_intro.png`} alt="서비스 소개" />
            </S.ImageContainer>
        </S.ContentContainer>
        </>
    );
}

export default Introduction;