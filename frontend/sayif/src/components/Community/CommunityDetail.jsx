import { useParams } from 'react-router-dom';
import S from './style/CommunityDetailStyled';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { GetCommunityDetail, GetCommunityComment, PostCommunityComment } from '../../api/Main';

function CommunityDetail() {
    const { id } = useParams();
    const { token, member } = useSelector(state => state.member);
    const [content, SetContent] = useState([]);
    const [comment, SetComment] = useState([]);
    const [writeComment, SetWriteComment] = useState();

    useEffect(() => {
        const callDetail = async () => {
            try {
                const response = await GetCommunityDetail(token, id);
                if(response.status === 200) {
                    SetContent(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const callCommentList = async () => {
            try {
                const response = await GetCommunityComment(token, id);
                if(response.status === 200) {
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

    const SubmitComment = () => {
        const callSubmit = async () => {
            try {
                const response = await PostCommunityComment(token, id, writeComment);
                if(response.status === 200) {
                    alert("댓글이 성공적으로 등록되었습니다!");
                    window.location.reload();
                }
            }catch(error) {
                alert("댓글 등록이 실패했어요! 다시 한 번 시도해보세요!");
                console.log(error);
            }
        };

        callSubmit();
    };

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
                                        {data.writer}
                                    </span>
                                    <S.CommentDate>{data.createdAt}</S.CommentDate>
                                    <S.CommentContent>
                                        {data.content}
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
