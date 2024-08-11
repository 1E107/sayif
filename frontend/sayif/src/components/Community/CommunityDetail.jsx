import { useParams, useNavigate } from 'react-router-dom';
import S from './style/CommunityDetailStyled';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
    DeleteCommunityComment,
    GetCommunityComment,
    GetCommunityDetail,
    PostCommunityComment,
    UpdateCommunityComment,
} from '../../api/Main';

function CommunityDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // Add useNavigate hook
    const { token, member } = useSelector(state => state.member);
    const [content, SetContent] = useState(null); // 초기값을 null로 변경
    const [comment, SetComment] = useState([]);
    const [writeComment, SetWriteComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [isEditing, setIsEditing] = useState(null); // Track which comment is being edited

    useEffect(() => {
        const callDetail = async () => {
            try {
                const response = await GetCommunityDetail(token, id);
                if (response.status === 200) {
                    SetContent(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const callCommentList = async () => {
            try {
                const response = await GetCommunityComment(token, id);
                if (response.status === 200) {
                    SetComment(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callDetail();
        callCommentList();
    }, [id, token]);

    const handleWriteComment = event => {
        SetWriteComment(event.target.value);
    };

    const handleEditComment = event => {
        setEditComment(event.target.value);
    };

    const SubmitComment = async () => {
        try {
            const response = await PostCommunityComment(token, id,
                writeComment);
            if (response.status === 200) {
                alert('댓글이 성공적으로 등록되었습니다!');
                window.location.reload();
            }
        } catch (error) {
            alert('댓글 등록이 실패했어요! 다시 한 번 시도해보세요!');
            console.log(error);
        }
    };

    const handleDeleteComment = async commentId => {
        try {
            const response = await DeleteCommunityComment(commentId, token);
            if (response.status === 200) {
                alert('댓글이 삭제되었습니다!');
                window.location.reload();
            }
        } catch (error) {
            alert('댓글 삭제에 실패했어요! 다시 한 번 시도해보세요!');
            console.log(error);
        }
    };

    const handleUpdateComment = async commentId => {
        try {
            const response = await UpdateCommunityComment(
                commentId,
                editComment,
                token,
            );
            if (response.status === 200) {
                alert('댓글이 수정되었습니다!');
                setIsEditing(null); // Reset editing state
                window.location.reload();
            }
        } catch (error) {
            alert('댓글 수정에 실패했어요! 다시 한 번 시도해보세요!');
            console.log(error);
        }
    };

    const isImage = url => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    const commentLength = comment.length;

    const handleDownloadImage = () => {
        if (content?.fileUrl) {
            const userConfirmed = window.confirm('이미지를 다운로드하시겠습니까?');
            if (userConfirmed) {
                const link = document.createElement('a');
                link.href = content.fileUrl;
                link.download = content.fileUrl.split('/').pop(); // Extract filename from URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    const handleImageClick = () => {
        handleDownloadImage();
    };

    return (
        <S.Container>
            <S.BackButton onClick={() => navigate(-1)}>←</S.BackButton> {/* Add BackButton here */}
            {content ? (
                <>
                    <S.Title>{content.title}</S.Title>
                    <S.DateAndWriter>
                        {content.createdAt} | {content.writer} |
                        조회수: {content.hitCount}
                    </S.DateAndWriter>
                    <S.CustomHr />
                    <S.Content>
                        {content.content}
                    </S.Content>
                    <S.CustomHr />
                    {/* 파일이 존재하고 이미지일 때만 300x300 사이즈로 표시 */}
                    {content.fileUrl && isImage(content.fileUrl) && (
                        <S.Fieldset>
                            <S.Legend onClick={handleDownloadImage}>
                                첨부된 이미지
                            </S.Legend>
                            <S.ImageContainer onClick={handleImageClick}>
                                <S.Image
                                    src={content.fileUrl}
                                    alt="게시글 파일"
                                />
                            </S.ImageContainer>
                        </S.Fieldset>
                    )}
                    <S.CustomHr />
                    <S.CommentTitle>댓글({commentLength})</S.CommentTitle>
                    <S.CustomHr />
                    <S.CommentBox>
                        <S.CommentList>
                            {comment.map((data, index) => (
                                <S.CommentItem key={index}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                marginRight: '10px',
                                                fontSize: '18px',
                                            }}
                                        >
                                            {data.writer}
                                        </span>
                                        <S.CommentDate>
                                            {data.createdAt}
                                        </S.CommentDate>
                                        {data.writer === member.username && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    marginLeft: 'auto',
                                                }}
                                            >
                                                {isEditing === data.id ? (
                                                    <>
                                                        <S.SmallButton
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleUpdateComment(
                                                                    data.id,
                                                                )
                                                            }
                                                        >
                                                            저장
                                                        </S.SmallButton>
                                                        <S.SmallButton
                                                            variant="contained"
                                                            onClick={() =>
                                                                setIsEditing(
                                                                    null,
                                                                )
                                                            }
                                                        >
                                                            취소
                                                        </S.SmallButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.SmallButton
                                                            variant="contained"
                                                            onClick={() => {
                                                                setIsEditing(
                                                                    data.id,
                                                                );
                                                                setEditComment(
                                                                    data.content,
                                                                );
                                                            }}
                                                        >
                                                            수정
                                                        </S.SmallButton>
                                                        <S.SmallButton
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleDeleteComment(
                                                                    data.id,
                                                                )
                                                            }
                                                        >
                                                            삭제
                                                        </S.SmallButton>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {isEditing === data.id ? (
                                        <S.CommentEditBox
                                            value={editComment}
                                            onChange={handleEditComment}
                                        />
                                    ) : (
                                        <S.CommentContent>
                                            {data.content}
                                        </S.CommentContent>
                                    )}
                                </S.CommentItem>
                            ))}
                        </S.CommentList>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <S.CommentWriteBox
                                onChange={handleWriteComment}
                                value={writeComment}
                            />
                            <S.CustomButton
                                variant="contained"
                                onClick={SubmitComment}
                            >
                                등록
                            </S.CustomButton>
                        </div>
                    </S.CommentBox>
                </>
            ) : (
                <>
                    <S.LoadingText>
                        게시글이 곧 나타나요! 잠시만 기다려 주세요.
                    </S.LoadingText>
                    <CircularProgress style={{ color: '#116530' }} />
                </>
            )}
        </S.Container>
    );
}

export default CommunityDetail;
