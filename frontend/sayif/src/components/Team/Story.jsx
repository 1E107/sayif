import S from "./style/StoryStyled"

const writing = [
    {
        content_id : 1,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 2,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 3,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {  content_id : 4,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 5,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 6,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 7,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 8,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 9,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
    {
        content_id : 10,
        content: 'React의 기초',
        creat_at: '홍길동',
    },
];

const rows = [];
for (let i = 0; i < writing.length; i += 6) {
    rows.push(writing.slice(i, i + 6));
}

function Story() {
    const StoryView = (
        <S.Main>
            <S.Container>
                {
                    rows.map((row, index) => (
                        <S.PostItWrapper key={index}>
                            {
                                row.map(postIt => {
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
                                        <S.CustomImg key={postIt.id} src={`/img/Story/Post-it${randomValue}.png`} style={style}/>
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
        </S.Main>
    )

    return StoryView;
}

export default Story;