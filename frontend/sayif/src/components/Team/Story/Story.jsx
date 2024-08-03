import { useEffect, useState } from 'react';
import S from './style/StoryStyled';
import { getStoryList } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Story() {
    const [selectPostIt, setSelectPostIt] = useState(false);
    const [imgNum, setImgNum] = useState(1);
    const [selectContent, setSelectContent] = useState('');
    const { token, member } = useSelector(state => state.member);
    const [writing, SetWriting] = useState([]);
    const navigate = useNavigate();

    const showDetail = (index, num) => {
        setImgNum(num);
        setSelectContent(writing[index].content);
        setSelectPostIt(true);
    };

    const closeDetail = () => {
        setSelectPostIt(false);
    };

    const goCreateStory = () => {
        navigate("/team/create-story");
    }

    useEffect(() => {
        const callStoryList = async () => {
            try {
                const response = await getStoryList(member.teamId, token);
                if (response.status == 200) {
                    const storyList = response.data;
                    {
                        storyList.map(story => {
                            const randomValue =
                                Math.floor(Math.random() * 5) + 1;
                            const randomRotation =
                                Math.floor(Math.random() * 91) - 45;
                            const randomX = Math.floor(Math.random() * 1000);
                            const randomY = Math.floor(Math.random() * 600);
                            story.randomValue = randomValue;
                            story.randomRotation = randomRotation;
                            story.randomX = randomX;
                            story.randomY = randomY;
                        });
                    }
                    SetWriting(storyList);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callStoryList();
    }, []);

    const StoryView = (
        <S.Main>
            <S.Container>
                <S.PostItWrapper>
                    {writing.map((write, index) => {
                        const style = {
                            position: 'absolute',
                            left: `${write.randomX}px`,
                            top: `${write.randomY}px`,
                            transform: `rotate(${write.randomRotation}deg)`,
                            transition: 'transform 0.3s',
                        };

                        return (
                            <S.CustomImg
                                key={write.contentId}
                                src={`/img/Story/Post-it${write.randomValue}.png`}
                                style={style}
                                onClick={() => {
                                    showDetail(index, write.randomValue);
                                }}
                            />
                        );
                    })}
                </S.PostItWrapper>
            </S.Container>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <S.CustomButton variant="outlined" onClick={goCreateStory}>사연 보내기</S.CustomButton>
            </div>

            {selectPostIt && (
                <S.Modal onClick={closeDetail}>
                    <S.ModalContent>
                        <img src={`/img/Story/Post-it${imgNum}.png`} />
                        <S.ModalText>{selectContent}</S.ModalText>
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.Main>
    );

    return StoryView;
}

export default Story;
