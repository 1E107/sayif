import { useEffect, useState } from 'react';
import S from './style/StoryStyled';
import { getStoryList, getReadStatus } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';

function Story() {
    const [selectPostIt, setSelectPostIt] = useState(false);
    const [imgNum, setImgNum] = useState(1);
    const [selectContent, setSelectContent] = useState('');
    const { token, member } = useSelector(state => state.member);
    const [selectContentId, setSelectContentId] = useState('');
    const [selectIsRead, setSelectIsRead] = useState(false);
    const [writing, SetWriting] = useState([]);
    const [hidden, SetHidden] = useState([]);
    const navigate = useNavigate();

    const showDetail = (index, num) => {
        setImgNum(num);
        setSelectContent(writing[index].content);
        setSelectContentId(writing[index].contentId);
        setSelectIsRead(writing[index].read);
        setSelectPostIt(true);
    };

    const closeDetail = () => {
        setSelectPostIt(false);
    };

    const goCreateStory = () => {
        navigate('/team/create-story');
    };

    const handleRead = () => {
        const callReadStatus = async () => {
            try {
                const response = await getReadStatus(
                    member.teamId,
                    selectContentId,
                    token,
                );
                if (response.status === 200) {
                    alert('해당 사연을 읽었습니다!');
                    SetHidden(prev => [...prev, selectContentId]);
                    // window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        };
        callReadStatus();
    };

    useEffect(() => {
        const callStoryList = async () => {
            try {
                const response = await getStoryList(member.teamId, token);
                if (response.status == 200) {
                    const storyList = response.data;
                    {
                        storyList
                            .filter(story => !story.read)
                            .map(story => {
                                const randomValue =
                                    Math.floor(Math.random() * 5) + 1;
                                const randomRotation =
                                    Math.floor(Math.random() * 91) - 45;
                                const randomX = Math.floor(Math.random() * 900);
                                const randomY = Math.floor(Math.random() * 500);
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '50px',
                }}
            >
                <S.ExplainText>
                    익명 사연 하나를 작성하면 팀 포인트가 2점 증가합니다!{' '}
                </S.ExplainText>
                <S.CustomButton variant="outlined" onClick={goCreateStory}>
                    사연 보내기
                    <NavigateNextIcon style={{ marginLeft: '5px' }} />
                </S.CustomButton>
            </div>
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
                            <>
                                {!write.read &&
                                !hidden.includes(write.contentId) ? (
                                    <S.CustomImg
                                        key={write.contentId}
                                        src={`/img/Story/Post-it${write.randomValue}.png`}
                                        style={style}
                                        onClick={() => {
                                            showDetail(
                                                index,
                                                write.randomValue,
                                            );
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                            </>
                        );
                    })}
                </S.PostItWrapper>
            </S.Container>

            {selectPostIt && (
                <S.Modal onClick={closeDetail}>
                    <S.ModalContent>
                        <img src={`/img/Story/Post-it${imgNum}.png`} />
                        {member.role === 'Mentor' && !selectIsRead ? (
                            <S.ReadButton onClick={handleRead}>
                                <CheckIcon
                                    style={{
                                        marginRight: '5px',
                                        fontSize: '16px',
                                    }}
                                />
                                읽기
                            </S.ReadButton>
                        ) : (
                            <></>
                        )}

                        <S.ModalText>{selectContent}</S.ModalText>
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.Main>
    );

    return StoryView;
}

export default Story;
