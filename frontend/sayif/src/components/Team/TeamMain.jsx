import S from './style/TeamMainStyled';
import CreateIcon from '@mui/icons-material/Create';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import { useEffect } from 'react';

import '../../styles/fonts.css';
import { ReactTyped } from 'react-typed';
import {
    getTeamExperience,
    getTeamName,
    modifyTeamName,
} from '../../api/TeamApi';
import { useSelector } from 'react-redux';
import ChatbotModal from './ChatBotModal';
import Swal from 'sweetalert2';
import Popover from '@mui/material/Popover';

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
    const [isChatBotModalOpen, setIsChatBotModalOpen] = React.useState(false);
    const imageBoxRef = React.useRef(null); // 이미지 박스를 참조하는 ref
    const [currentLevel, setCurrentLevel] = React.useState(0); // 현재 표시된 이미지 레벨 상태 관리

    const [anchorEl, setAnchorEl] = React.useState(null); // Popover anchor 상태 관리
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        async function fetchProgress() {
            const experience = await getTeamExperience(member.teamId, token);
            setProgress(experience.data.point);
            setCurrentLevel(Math.floor(experience.data.point / 100));
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

    const handleChatBotButtonClick = () => {
        setIsChatBotModalOpen(true); // ChatBotModal을 염
    };

    const handleChatBotModalClose = () => {
        setIsChatBotModalOpen(false); // ChatBotModal을 닫음
    };

    const level = Math.floor(progress / 100);
    const imageUrl = images[currentLevel] || images[0];

    const handlePreviousImage = () => {
        if (currentLevel > 0) {
            setCurrentLevel(prevLevel => prevLevel - 1);
        } else {
            Swal.fire({
                icon: 'warning',
                title: '이전 이미지가 없습니다.',
                text: '가장 낮은 레벨입니다.',
                confirmButtonText: '확인',
                confirmButtonColor: '#6c8e23',
            });
        }
    };

    const handleNextImage = () => {
        if (currentLevel < level) {
            setCurrentLevel(prevLevel => prevLevel + 1);
        } else {
            Swal.fire({
                icon: 'warning',
                title: '레벨 업이 필요합니다.',
                text: '현재 레벨을 초과한 레벨입니다.',
                confirmButtonText: '확인',
                confirmButtonColor: '#6c8e23',
            });
        }
    };

    const handleImageClick = event => {
        setAnchorEl(event.currentTarget); // 이미지 클릭 시 Popover 열기
    };

    const handlePopoverClose = () => {
        setAnchorEl(null); // Popover 닫기
    };

    const MainView = (
        <S.Container>
            <S.Wrapper>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ArrowBackIosIcon
                        style={{
                            marginRight: '10',
                            color: currentLevel === 0 ? '#DDD' : '#000',
                            cursor: currentLevel > 0 ? 'pointer' : 'default',
                        }}
                        onClick={handlePreviousImage}
                    />
                    <S.ImageBox
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'contain',
                        }}
                        ref={imageBoxRef} // 이미지 박스에 ref 연결
                        onClick={handleImageClick} // 이미지 클릭 시 Popover 열기
                    ></S.ImageBox>
                    <ArrowForwardIosIcon
                        style={{
                            marginLeft: '15',
                            color: currentLevel === level ? '#DDD' : '#000',
                            cursor:
                                currentLevel < level ? 'pointer' : 'default',
                        }}
                        onClick={handleNextImage}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <S.TeamNameText>
                        Lv. {level} {teamName}
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
                        fontSize: '26px',
                        color: 'black',
                        textAlign: 'center',
                        width: '450px',
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
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <S.CustomAlert
                    onClose={handleCloseSnackbar}
                    severity="none"
                    icon={<NorthWestIcon />}
                >
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
            <S.FloatingButton onClick={handleChatBotButtonClick} />
            <ChatbotModal
                open={isChatBotModalOpen}
                handleClose={handleChatBotModalClose}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: {
                        marginLeft: '20px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // 연한 그림자 적용
                    },
                }}
            >
                <div
                    style={{
                        padding: '20px',
                        fontFamily: 'Chosungu',
                        color: '#0B4619',
                    }}
                >
                    팀 포인트를 모아 새싹을 성장시켜 보아요!
                    <br /> <br />
                    <br />
                    사연함에 익명 사연 작성 시 +2P
                    <br />
                    <br />
                    챌린지 한 번 참여 시 +5P
                    <br />
                    <br />
                    퀴즈 한 문제 제출 시 +10P
                    <br />
                    <br />
                    멘토링 한 번 진행 시 +50P
                </div>
            </Popover>
        </S.Container>
    );

    return MainView;
}

export default TeamMain;
