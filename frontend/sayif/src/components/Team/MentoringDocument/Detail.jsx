import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import S from './style/DetailStyled';
import { useEffect, useState } from 'react';
import { getMaterialDetail } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';

function MaterialDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { token } = useSelector(state => state.member);
    const [content, SetContent] = useState();

    useEffect(() => {
        const callDetail = async () => {
            try {
                const response = await getMaterialDetail(id, token);
                if (response.status === 200) {
                    SetContent(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callDetail();
    }, [id, token]);

    const handleBackButtonClick = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const DetailView = (
        <S.Container>
            <S.BackButton onClick={handleBackButtonClick}>
                <S.BackIcon />
            </S.BackButton>
            {content ? (
                <>
                    <S.Title>{content.title}</S.Title>
                    <S.DateAndWriter>{content.createdAt}</S.DateAndWriter>
                    <S.CustomHr />
                    <S.Content>{content.content}</S.Content>
                </>
            ) : (
                <div>로딩 중...</div>
            )}
        </S.Container>
    );

    return DetailView;
}

export default MaterialDetail;
