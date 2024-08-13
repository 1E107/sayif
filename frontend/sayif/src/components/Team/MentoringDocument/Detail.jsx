import { useNavigate, useParams } from 'react-router-dom';
import S from './style/DetailStyled';
import { useEffect, useState } from 'react';
import { getMaterialDetail } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/config';

function MaterialDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector(state => state.member);
    const [content, setContent] = useState();

    useEffect(() => {
        const callDetail = async () => {
            try {
                const response = await getMaterialDetail(id, token);
                if (response.status === 200) {
                    setContent(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callDetail();
    }, [id, token]);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleDownloadClick = async () => {
        try {

            const response = await axios.get(
                `${API_BASE_URL}/team/material/download?fileUrl=${content.fileUrl}`,
                {
                    responseType: 'blob', // Blob 형태로 응답을 받음
                    headers: {
                        Authorization: `Bearer ${token}`, // 인증 헤더 추가
                    },
                });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', content.file); // 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생:', error);
        }
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
                    {content.fileUrl && (
                        <S.FileDownloadButton onClick={handleDownloadClick}>
                            파일 다운로드
                        </S.FileDownloadButton>
                    )}
                </>
            ) : (
                <div>로딩 중...</div>
            )}
        </S.Container>
    );

    return DetailView;
}

export default MaterialDetail;
