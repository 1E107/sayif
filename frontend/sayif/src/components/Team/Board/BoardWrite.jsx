import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style/BoardWriteStyled';
import { useSelector } from 'react-redux';
import { postBoardWrite } from '../../../api/TeamApi';

function BoardWrite() {
    const navigate = useNavigate();
    const { token, member } = useSelector(state => state.member);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = e => setTitle(e.target.value);
    const handleContentChange = e => setContent(e.target.value);

    const handleSubmit = async () => {
        try {
            const response = await postBoardWrite(member.teamId, token, {
                title,
                content,
            });
            if (response.status === 200) {
                alert('글이 성공적으로 등록되었습니다!');
                navigate('/team/board');
            }
        } catch (error) {
            alert('글 등록에 실패했어요. 다시 시도해보세요.');
            console.error(error);
        }
    };

    return (
        <S.Container>
            <S.Form>
                <S.TitleInput
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요"
                />
                <S.ContentTextArea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="내용을 입력하세요"
                />
                <S.SubmitButton onClick={handleSubmit}>등록</S.SubmitButton>
                <S.CancelButton onClick={() => navigate(-1)}>
                    취소
                </S.CancelButton>
            </S.Form>
        </S.Container>
    );
}

export default BoardWrite;

