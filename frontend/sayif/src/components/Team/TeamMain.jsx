import S from './style/TeamMainStyled';
import CreateIcon from '@mui/icons-material/Create';
import * as React from 'react';

import '../../styles/fonts.css';
import { ReactTyped } from 'react-typed';
import {
    getTeamExperience,
    getTeamName,
    modifyTeamName,
} from '../../api/TeamApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const images = [
    `${process.env.PUBLIC_URL}/img/Plant/새잎_0단계.png`,
    `${process.env.PUBLIC_URL}/img/Plant/새잎_1단계.png`,
    `${process.env.PUBLIC_URL}/img/Plant/새잎_2단계.png`,
    `${process.env.PUBLIC_URL}/img/Plant/새잎_3단계.png`,
    `${process.env.PUBLIC_URL}/img/Plant/새잎_4단계.png`,
    `${process.env.PUBLIC_URL}/img/Plant/새잎_5단계.png`,
];

function TeamMain() {
    const [progress, setProgress] = React.useState(0);
    const [openSnackbar, setOpenSnackbar] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);
    const [newTeamName, setNewTeamName] = React.useState(''); // 새 팀 이름 상태 관리
    const [teamName, setTeamName] = React.useState(''); // 팀 이름 상태 관리
    const { token, member } = useSelector(state => state.member);

    useEffect(() => {
        async function fetchProgress() {
            const experience = await getTeamExperience(member.teamId, token);
            setProgress(experience.data.point);
        }
        async function fetchTeamName() {
            const response = await getTeamName(member.teamId, token);
            setTeamName(response.data.name);
        }
        fetchProgress();
        fetchTeamName();
    }, [member.teamId, token]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleTeamNameChange = event => {
        setNewTeamName(event.target.value);
    };

    const handleConfirmAndSave = async () => {
        const confirmed = window.confirm('팀 이름을 수정하시겠습니까?');
        if (confirmed) {
            try {
                await modifyTeamName(member.teamId, token, newTeamName);
                setTeamName(newTeamName); // 팀 이름 상태 업데이트
                handleCloseModal();
            } catch (error) {
                console.error('팀 이름 변경 중 오류 발생:', error);
            }
        }
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleConfirmAndSave(); // 엔터키를 누르면 버튼 클릭 함수 실행
        }
    };

    const level = Math.floor(progress / 100);
    const imageUrl = images[level] || images[0];

    const MainView = (
        <S.Container>
            <S.Wrapper>
                <S.ImageBox
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'contain',
                    }}
                ></S.ImageBox>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <S.TeamNameText>
                        Lv. {Math.floor(progress / 100)} {teamName}
                        <CreateIcon
                            style={{
                                color: '#DED3A6',
                                marginLeft: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={handleOpenModal}
                        />
                    </S.TeamNameText>
                </div>
                <S.ScoreContainer>
                    <S.TeamScoreText>
                        {progress / 100 < 5 ? progress % 100 : 100}
                    </S.TeamScoreText>
                    <S.CustomLinearProgress
                        variant="determinate"
                        value={progress / 100 < 5 ? progress % 100 : 100}
                    />
                </S.ScoreContainer>
            </S.Wrapper>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <S.BubbleImg
                    src={`${process.env.PUBLIC_URL}/img/speech-bubble.png`}
                    alt="speech bubble"
                    style={{ display: 'block' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '67%',
                        left: '45%',
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'Ownglyph_ryurue-Rg',
                        fontSize: '20px',
                        color: 'black',
                        textAlign: 'center',
                        width: '420px',
                        pointerEvents: 'none',
                    }}
                >
                    <ReactTyped
                        strings={[
                            '오늘 하루는 어떻게 보냈나요? 즐거운 일도 있었으면 좋겠어요!\n다음 강의도 함께 힘차게 해볼까요?',
                            '하루가 어떻게 지나갔나요? 작은 성취라도 있었다면 정말 멋진 거예요! 다음 강의도 함께 열심히 해보자구요!',
                            '다음 단계까지 조금만 더 힘내보아요! 우리 함께 웃으면서 즐겁게 준비할 수 있도록 해요. 파이팅!',
                            '최근에 도전한 것 중에 가장 기억에 남는 순간은 무엇인가요? 그 경험을 바탕으로 다음 강의도 함께 열심히 해봐요!',
                            '요즘 어떤 일이 가장 즐거우세요? 그 기분을 계속 이어가면서 다음 강의도 힘차게 해봅시다!',
                            '최근에 어떤 기분 좋은 일이 있었나요? 그 긍정적인 에너지를 계속 이어가면서 서로 응원해요!',
                        ]}
                        typeSpeed={120}
                        backSpeed={30}
                        loop
                    />
                </div>
            </div>
            <S.CustomSnackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <S.CustomAlert onClose={handleCloseSnackbar} severity="none">
                    메뉴 버튼을 눌러 더 많은 팀 페이지 기능을 확인해보세요!
                </S.CustomAlert>
            </S.CustomSnackbar>
            <S.CustomModal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <S.CustomBox>
                    <h3 id="modal-title">팀 이름을 수정합니다.</h3>
                    <S.CustomTextField
                        id="team-name"
                        label="새 팀 이름"
                        variant="outlined"
                        fullWidth
                        value={newTeamName}
                        onChange={handleTeamNameChange}
                        onKeyPress={handleKeyPress}
                    />
                    <S.CustomButton
                        variant="contained"
                        onClick={handleConfirmAndSave}
                    >
                        수정
                    </S.CustomButton>
                </S.CustomBox>
            </S.CustomModal>
        </S.Container>
    );

    return MainView;
}

export default TeamMain;
