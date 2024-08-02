import { useParams } from "react-router-dom";
import S from "./style/BoardDetail";
import { useEffect, useState } from "react";
import { getQnADetail, getQnAComment, postQnAComment } from "../../../api/TeamApi";
import { useSelector } from "react-redux";

function BoardDetail() {
    const { id } = useParams();
    const {token, member} = useSelector(state => state.member);
    const [content, SetContent] = useState();
    const [comment, SetComment] = useState();
    const [writeComment, SetWriteComment] = useState();

    useEffect(() => {
        const callDetail = async() => {
            try{
                const response = await getQnADetail(id, token);
                if(response.status === 200) {
                    SetContent(response.data);
                }
            }catch(error) {
                console.log(error);
            }
        }

        const callCommentList = async() => {
            try {
                const response = await getQnAComment(id, token);
                if(response.status === 200) {
                    SetComment(response.data);
                }
            }catch(error) {
                console.log(error);
            }
        }

        callDetail();
        callCommentList();
    }, [id, token]);

    const handleWriteComment = (event) => {
        SetWriteComment(event.target.value);
    }

    const SubmitComment = () => {
        const callPostComment = async() => {
            try {
                const response = await postQnAComment(id, token, writeComment);
                if(response.status === 200) {
                    alert("댓글이 성공적으로 등록되었습니다!");
                    window.location.reload();
                }
            }catch(error) {
                console.log(error);
            }
        }
        callPostComment();
    }

    const DetailView = (
        <S.Container>
            {content ? (<>
                <S.Title>{content.title}</S.Title>
                <S.DateAndWriter>{content.createdAt} | {content.writer}</S.DateAndWriter>
                <S.CustomHr/>
                <S.Content>
                    {content.content}
                </S.Content>
                <S.CustomHr/>
                <S.CommentTitle>댓글 (1)</S.CommentTitle>
                <S.CustomHr/>
                <S.CommentBox>
                    <S.CommentList>
                        {comment.map((data, index) => (
                            <S.CommentItem>
                                <span style={{fontWeight:"bold"}}>{data.username}</span> <S.CommentDate>2024.07.30</S.CommentDate>
                                <S.CommentContent> {data.content} </S.CommentContent>
                            </S.CommentItem>
                        ))}
                    </S.CommentList>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <S.CommentWriteBox onChange={handleWriteComment}/>
                        <S.CustomButton variant="contained" onClick={SubmitComment}>등록</S.CustomButton>
                    </div>
                </S.CommentBox>
            </>) : (
                <div>로딩 중...</div>
            )
            }
        </S.Container>
    );

    return DetailView;
}

export default BoardDetail;

