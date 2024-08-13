import { useParams, useNavigate } from 'react-router-dom';
import S from './style/BoardDetail';
import { useEffect, useState } from 'react';
import {
    getQnADetail,
    getQnAComment,
    postQnAComment,
} from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

function BoardDetail() {
    const { id } = useParams();
    const { token } = useSelector(state => state.member);
    const [content, SetContent] = useState([]);
    const [comment, SetComment] = useState([]);
    const [writeComment, SetWriteComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const callDetail = async () => {
            try {
                const response = await getQnADetail(id, token);
                if (response.status === 200) {
                    SetContent(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const callCommentList = async () => {
            try {
                const response = await getQnAComment(id, token);
                if (response.status === 200) {
                    SetComment(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        callDetail();
        callCommentList();
    }, [id, token]);

    const handleWriteComment = event => {
        SetWriteComment(event.target.value);
    };

    const SubmitComment = async () => {
        try {
            const response = await postQnAComment(id, token, writeComment);
            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: '성공',
                    text: '댓글이 성공적으로 등록되었습니다!',
                    confirmButtonColor: '#6c8e23',
                });
                // 댓글 등록 후 댓글 목록을 새로 고침
                const updatedComments = await getQnAComment(id, token);
                if (updatedComments.status === 200) {
                    SetComment(updatedComments.data);
                }
                SetWriteComment(''); // 입력 필드 초기화
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: '실패',
                text: '댓글 등록이 실패했어요! 다시 한 번 시도해보세요!',
                confirmButtonColor: '#6c8e23',
            });
            console.error(error);
        }
    };

    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const commentLength = comment.length;

    const DetailView = (
        <S.Container>
            <S.BackButton onClick={handleBackClick}>
                <ArrowBackIosIcon
                    style={{ fontSize: '28px', fontWeight: 'bold' }}
                />
            </S.BackButton>
            {content ? (
                <>
                    <S.Title>{content.title}</S.Title>
                    <S.DateAndWriter>
                        {content.createdAt} | {content.writer}
                    </S.DateAndWriter>
                    <S.CustomHr />
                    <S.Content>{content.content}</S.Content>
                    <S.CustomHr />
                    <S.CommentTitle>댓글({commentLength})</S.CommentTitle>
                    <S.CustomHr />
                    <S.CommentBox>
                        <S.CommentList>
                            {comment.map((data, index) => (
                                <S.CommentItem key={index}>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {data.username}
                                    </span>{' '}
                                    <S.CommentDate>
                                        {data.createdAt}
                                    </S.CommentDate>
                                    <S.CommentContent>
                                        {' '}
                                        {data.content}{' '}
                                    </S.CommentContent>
                                </S.CommentItem>
                            ))}
                        </S.CommentList>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <S.CommentWriteBox
                                value={writeComment}
                                onChange={handleWriteComment}
                                placeholder="댓글을 입력하세요..."
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

    return DetailView;
}

export default BoardDetail;
