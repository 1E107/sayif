import { useEffect, useState } from 'react';
import S from './style/InformationDetailStyled';
import { GetDetailSupportInfo } from '../../api/Main';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function InformationDetail() {
    const { token, member } = useSelector(state => state.member);
    const { id } = useParams();
    const [detailContent, SetDetailContent] = useState();

    useEffect(() => {
        const callDetailInfo = async () => {
            try {
                const response = await GetDetailSupportInfo(id, token);
                if (response.status === 200) {
                    SetDetailContent(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        callDetailInfo();
    }, [id, token]);

    const DetailView = (
        <S.Container>
            <S.Title>자립 지원 정보</S.Title>
            <div>
                <S.Line />
            </div>
            <S.Form>
                <div style={{ display: 'flex', margin: '30px' }}>
                    <S.CustomImg
                        src={
                            detailContent && detailContent.img
                            && detailContent.img !== ''
                                ? detailContent.img
                                : '/img/info-temp-img.jpg'
                        }
                        alt="정보 이미지"
                    />
                    <div>
                        {detailContent ? (
                            <>
                                <S.TitleText>{detailContent.title}</S.TitleText>
                                <S.ContentText>
                                    모집시작 &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                                    {detailContent.recruitStart}
                                </S.ContentText>
                                <S.ContentText>
                                    모집마감 &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                                    {detailContent.recruitEnd}
                                </S.ContentText>
                                <S.ContentText>
                                    모집기관 &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                                    {detailContent.region}
                                </S.ContentText>
                            </>
                        ) : (
                            <S.ContentText>로딩 중...</S.ContentText> // 로딩 중 메시지
                        )}
                    </div>
                </div>
                <div>
                    {detailContent ? (
                        <>
                            <S.ContentText style={{ fontWeight: 'bold' }}>
                                📢 사업명
                            </S.ContentText>
                            <S.ContentText style={{ marginTop: '15px' }}>
                                {detailContent.title}
                            </S.ContentText>
                            <S.ContentText style={{ fontWeight: 'bold' }}>
                                📢 선정대상 및 자격요건
                            </S.ContentText>
                            <S.ContentText style={{ marginTop: '15px' }}>
                                {detailContent.ranged}
                            </S.ContentText>
                            <S.ContentText style={{ fontWeight: 'bold' }}>
                                📢 신청방법
                            </S.ContentText>
                            <S.ContentText style={{ marginTop: '15px' }}>
                                {detailContent.method}
                            </S.ContentText>
                            <S.ButtonContainer>
                                <S.Button onClick={() => window.open(
                                    detailContent.link, '_blank')}>
                                    신청하러 가기
                                </S.Button>
                            </S.ButtonContainer>
                        </>
                    ) : (
                        <S.ContentText>로딩 중...</S.ContentText>
                    )}
                </div>
            </S.Form>
        </S.Container>
    );
    return DetailView;
}

export default InformationDetail;
