import { useState } from "react";
import S from "./style/StoryStyled"
import { Modal } from "@mui/material";

const writing = [
    {
        content_id : 1,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 2,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 3,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {  content_id : 4,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 5,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 6,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 7,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 8,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 9,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
    {
        content_id : 10,
        content: '안녕하세요 단비님 오늘은 수업이 끝난 다음날이네요 아침 7시에 일어나 간단히 아침을 먹고 출근 준비를 했어요 이번 주말는 친구들을 만나 영화를 보면서 휴식을 취할 예정이랍니다. 단비님은 뭐하세용',
        creat_at: '홍길동',
    },
];

const rows = [];
for (let i = 0; i < writing.length; i += 6) {
    rows.push(writing.slice(i, i + 6));
}

function Story() {
    const [selectPostIt, setSelectPostIt] = useState(false);
    const [imgNum, setImgNum] = useState(1);
    const [selectContent, setSelectContent] = useState("");

    const showDetail = (row, col, num) => {
        console.log("click", rows[row][col].content);
        setImgNum(num);
        setSelectContent(rows[row][col].content);
        setSelectPostIt(true);
    }

    const closeDetail = () => {
        setSelectPostIt(false);
    }

    const StoryView = (
        <S.Main>
            <S.Container>
                {
                    rows.map((row, rowIndex) => (
                        <S.PostItWrapper key={rowIndex}>
                            {
                                row.map((col, colIndex) => {
                                    const randomValue = Math.floor(Math.random() * 5) + 1;
                                    const randomRotation = Math.floor(Math.random() * 91) - 45; 
                                    const randomX = Math.floor(Math.random() * (1000));
                                    const randomY = Math.floor(Math.random() * (600));
                
                                    const style = {
                                        position: 'absolute',
                                        left: `${randomX}px`,
                                        top: `${randomY}px`,
                                        transform: `rotate(${randomRotation}deg)`,
                                        transition: 'transform 0.3s'
                                    };

                                    return (
                                        <S.CustomImg 
                                            key={col.content_id} 
                                            src={`/img/Story/Post-it${randomValue}.png`} 
                                            style={style}
                                            onClick={() => {showDetail(rowIndex, colIndex, randomValue)}}
                                        />
                                    );
                                })
                            }
                        </S.PostItWrapper>
                    ))
                }
            </S.Container>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <S.CustomButton variant="outlined">사연 보내기</S.CustomButton>
            </div>

            {
                selectPostIt && (
                    <S.Modal onClick={closeDetail}>
                        <S.ModalContent>
                            <img src={`/img/Story/Post-it${imgNum}.png`}/>
                            <S.ModalText>{selectContent}</S.ModalText>
                        </S.ModalContent>
                    </S.Modal>
                )
            }
        </S.Main>
    )

    return StoryView;
}

export default Story;