import { TextField } from '@mui/material';
import S from './style/CreateStoryStyled';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useState } from 'react';
import { postStory } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acquireExperience } from '../../../api/config';

function CreateStory() {
    const navigate = useNavigate();
    const [storyContent, SetStoryContent] = useState('');
    const { token, member } = useSelector(state => state.member);

    const handleContent = event => {
        SetStoryContent(event.target.value);
    };

    const goStoryMain = () => {
        navigate('/team/story-board');
    };

    const submitStory = async () => {
        const callPostStory = async () => {
            try {
                const response = await postStory(
                    member.teamId,
                    token,
                    storyContent,
                );
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        callPostStory();
        acquireExperience(token, member,2);
        alert('익명 사연이 등록되었습니다.');
        navigate('/team/story-board');
    };

    const CreateStoryView = (
        <S.Container>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
            >
                <NavigateBeforeIcon style={{ color: '#116530' }} />
                <S.TitleText onClick={goStoryMain}>사연함</S.TitleText>
            </div>
            <S.Form>
                <S.ContentText>
                    사연함에 여러분의 소중한 이야기를 남겨주세요! <br />{' '}
                    익명으로 작성하실 수 있으니, 편안한 마음으로 자유롭게
                    남겨주시면 됩니다 :)
                </S.ContentText>
                <div>
                    <S.CustomTextarea onChange={handleContent} />
                </div>
                <S.CustomBtn variant="contained" onClick={submitStory}>
                    사연 남기기
                </S.CustomBtn>
            </S.Form>
        </S.Container>
    );

    return CreateStoryView;
}

export default CreateStory;
