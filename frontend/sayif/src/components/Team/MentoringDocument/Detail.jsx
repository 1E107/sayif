import { useParams } from 'react-router-dom';
import S from './style/DetailStyled';
import { useEffect, useState } from 'react';
import { getMaterialDetail } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';

function MaterialDetail() {
    const { id } = useParams();
    const { token, member } = useSelector(state => state.member);
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

    const DetailView = (
        <S.Container>
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
