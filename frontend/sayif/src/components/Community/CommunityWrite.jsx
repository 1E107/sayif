import React, { useState } from 'react';
import S from './style/CommunityWriteStyled'; // 스타일 파일 가져오기
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { WriteCommunity } from '../../api/Main';
import { CircularProgress } from '@mui/material';

function CommunityWrite() {
    const { token, member } = useSelector(state => state.member);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('Free');
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // 오류 상태 추가
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!title || title.length < 3) {
            errors.title = '제목은 3자 이상 입력해야 합니다.';
        }
        if (!content || content.length < 10) {
            errors.content = '내용은 10자 이상 입력해야 합니다.';
        }
        if (!type) {
            errors.type = '카테고리를 선택해야 합니다.';
        }
        if (
            file &&
            !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
        ) {
            errors.file =
                '지원되지 않는 파일 형식입니다. JPG, PNG, GIF만 업로드 가능합니다.';
        }
        if (file && file.size > 3 * 1024 * 1024) {
            // 파일 크기 3MB 제한
            errors.file = '파일 크기는 3MB를 넘을 수 없습니다.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handleContentChange = event => {
        setContent(event.target.value);
    };

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setFileUrl(URL.createObjectURL(file));
        }
    };

    const handleFileClick = () => {
        document.getElementById('file-upload').click();
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // 유효성 검사 실패 시 제출을 방지
        }

        setLoading(true);

        const formData = new FormData();
        // 게시글 정보 직렬화
        const post = new Blob(
            [
                JSON.stringify({
                    title: title,
                    content: content,
                    type: type,
                }),
            ],
            {
                type: 'application/json',
            },
        );
        formData.append('post', post);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await WriteCommunity(token, formData);
            if (response.status === 200) {
                alert('게시글이 성공적으로 등록되었습니다!');
                navigate('/community');
            }
        } catch (error) {
            alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <S.Form>
                <S.FormControl>
                    <S.CustomTextField
                        label="제목"
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        required
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </S.FormControl>
                <S.FormControl>
                    <S.CustomTextField
                        label="내용"
                        value={content}
                        onChange={handleContentChange}
                        fullWidth
                        required
                        multiline
                        rows={10}
                        error={!!errors.content}
                        helperText={errors.content}
                    />
                </S.FormControl>
                <S.FormControl>
                    <S.CustomTextField
                        select
                        label="카테고리"
                        value={type}
                        onChange={handleTypeChange}
                        fullWidth
                        required
                        error={!!errors.type}
                        helperText={errors.type}
                    >
                        <S.CustomMenuItem value="Free">일상</S.CustomMenuItem>
                        <S.CustomMenuItem value="Worry">고민</S.CustomMenuItem>
                    </S.CustomTextField>
                </S.FormControl>
                <S.FormControl>
                    <S.FileInputContainer>
                        <S.FileInput
                            accept="image/*"
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                        />
                        <S.PreviewContainer onClick={handleFileClick}>
                            <S.Legend>파일 업로드:</S.Legend>
                            {fileUrl && (
                                <S.PreviewImage src={fileUrl} alt="Preview" />
                            )}
                            <S.UploadNotice>{errors.file}</S.UploadNotice>
                        </S.PreviewContainer>
                    </S.FileInputContainer>
                </S.FormControl>
                <S.ButtonContainer>
                    <S.WriteButton
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : '등록'}
                    </S.WriteButton>
                </S.ButtonContainer>
            </S.Form>
        </S.Container>
    );
}

export default CommunityWrite;
