import { useParams } from 'react-router-dom';
import S from './style/CommunityDetailStyled';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function CommunityDetail() {
    const { id } = useParams();
    const { token, member } = useSelector(state => state.member);
    const [content, SetContent] = useState([]);
    const [comment, SetComment] = useState([]);
    const [writeComment, SetWriteComment] = useState();

    useEffect(() => {
        const callDetail = async () => {
            try {
            } catch (error) {
                console.log(error);
            }
        };

        const callCommentList = async () => {
            try {
            } catch (error) {
                console.log(error);
            }
        };
    }, [id, token]);

    const handleWriteComment = event => {
        SetWriteComment(event.target.value);
    };

    const SubmitComment = () => {};

    const commentLength = comment.length;

    const DetailView = (
        <S.Container>
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
                                <S.CommentItem>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {data.username}
                                    </span>{' '}
                                    <S.CommentDate>2024.07.30</S.CommentDate>
                                    <S.CommentContent>
                                        {' '}
                                        {data.content}{' '}
                                    </S.CommentContent>
                                </S.CommentItem>
                            ))}
                        </S.CommentList>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <S.CommentWriteBox onChange={handleWriteComment} />
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

export default CommunityDetail;
