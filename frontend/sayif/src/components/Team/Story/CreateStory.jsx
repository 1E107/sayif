import { TextField } from '@mui/material';
import S from './style/CreateStoryStyled';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useState } from 'react';
import { postStory } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acquireExperience } from '../../../api/config';

import Swal from 'sweetalert2';

function CreateStory() {
    const navigate = useNavigate();
    const [storyContent, SetStoryContent] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { token, member } = useSelector(state => state.member);

    const handleContent = event => {
        SetStoryContent(event.target.value);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        navigate('/team/story-board');
    };

    const goStoryMain = () => {
        navigate('/team/story-board');
    };

    const submitStory = async () => {
        try {
            await postStory(member.teamId, token, storyContent);
            acquireExperience(token, member, 2);

            await Swal.fire({
                title: '성공!',
                text: '익명 사연이 등록되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#3085d6',
            });

            navigate('/team/story-board');
        } catch (error) {
            console.log(error);
            await Swal.fire({
                title: '오류!',
                text: '사연 등록 중 오류가 발생했습니다. 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#d33',
            });
        }
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
        acquireExperience(token, member, 2);
        setOpenSnackbar(true);
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
            <S.CustomSnackbar
                open={openSnackbar}
                autoHideDuration={null}
                onClose={handleSnackbarClose}
            >
                <S.CustomAlert severity="success">
                    익명 사연이 등록되었습니다.
                    <br /> 팀포인트가 2점 증가했어요!
                    <S.ConfirmButton onClick={handleSnackbarClose}>
                        확인
                    </S.ConfirmButton>
                </S.CustomAlert>
            </S.CustomSnackbar>
        </S.Container>
    );

    return CreateStoryView;
}

export default CreateStory;
