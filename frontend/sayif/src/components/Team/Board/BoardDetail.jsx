import { useParams } from "react-router-dom";
import S from "./style/BoardDetail";
import { useEffect, useState } from "react";
import { getQnADetail } from "../../../api/TeamApi";
import { useSelector } from "react-redux";

function BoardDetail() {
    const { id } = useParams();
    const {token, member} = useSelector(state => state.member);
    const [content, SetContent] = useState();

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

        callDetail();
    }, [id, token]);

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
                        <S.CommentItem>
                            <span style={{fontWeight:"bold"}}>고둥</span> <S.CommentDate>2024.07.30</S.CommentDate>
                            <S.CommentContent>메모리 주소를 나타내며, 포인터 변수가 이 주소를 가리킬 수 있습니다. <br/>
                            포인터가 가리키는 주소에 저장된 값을 나타내며 이 값을 읽거나 쓸 수 있습니다.
                            </S.CommentContent>
                        </S.CommentItem>
                    </S.CommentList>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <S.CommentWriteBox/>
                        <S.CustomButton variant="contained">등록</S.CustomButton>
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

