import S from './style/ShowMemberStyled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import '../../styles/fonts.css';
import { useEffect, useState } from 'react';
import { getMemberInfo } from '../../api/TeamApi';
import { getMentoringPlan } from '../../api/MentoringApi';
import { useSelector } from 'react-redux';
import MessageModal from './style/MessageModal'; // MessageModal 컴포넌트 임포트
import ChatbotModal from './ChatBotModal';

const CustomCardMedia = styled(CardMedia)`
    height: 40px;
    background-color: #116530;
    color: white;
    padding: 30px;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
`;

const CustomButton = styled(Button)`
    color: black !important;
    font-family: ChosunGu !important;
    margin-left: 5px !important;
`;

const campus = {
    101: '부울경',
    102: '서울',
    103: '광주',
    104: '대전',
    105: '구미',
};

function ShowMembers() {
    const { token, member } = useSelector(state => state.member);
    const [mentorList, SetMentorList] = useState([]);
    const [menteeList, SetMenteeList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);
    const [mentoringInfo, setMentoringInfo] = useState(null);

    const handleOpenModal = mentorId => {
        setSelectedMentorId(mentorId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChatBotButtonClick = () => {
        setIsChatBotModalOpen(true); // ChatBotModal을 염
    };

    const handleChatBotModalClose = () => {
        setIsChatBotModalOpen(false); // ChatBotModal을 닫음
    };

    useEffect(() => {
        const callMemberInfo = async () => {
            try {
                const response = await getMemberInfo(member.teamId, token);
                if (response.status === 200) {
                    const mentee = response.data.filter(
                        member => member.role === 'Mentee',
                    );
                    const mentor = response.data.filter(
                        member => member.role === 'Mentor',
                    );

                    SetMentorList(mentor);
                    SetMenteeList(mentee);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const callMentoringPlan = async () => {
            try {
                const response = await getMentoringPlan(member.teamId, token);
                if (response.status === 200) {
                    const data = response.data;
                    const timeOnly = data.time.slice(0, 5); // "11:00" 형태로 변환
                    setMentoringInfo({
                        startDate: data.startDate,
                        endDate: data.endDate,
                        dayOfWeek: data.dayOfWeek,
                        time: timeOnly,
                        pmam: data.pmam,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        callMemberInfo();
        callMentoringPlan();
    }, []);

    const MainView = (
        <S.Container>
            <S.Title>멘토링 일정</S.Title>
            {mentoringInfo && (
                <S.MentoringDetails>
                    <div>
                        {mentoringInfo.startDate} ~ {mentoringInfo.endDate}
                    </div>
                    <div>매주 {mentoringInfo.dayOfWeek} 요일</div>
                    <div>
                        {mentoringInfo.pmam} {mentoringInfo.time}
                    </div>
                </S.MentoringDetails>
            )}
            <S.Title>단비</S.Title>
            <S.MentorList>
                {mentorList.map(mentor => {
                    return (
                        <Card
                            key={mentor.id}
                            sx={{
                                width: 400,
                                height: 260,
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CustomCardMedia>
                                <div>
                                    <S.MentorNameText>
                                        {mentor.nickname}
                                    </S.MentorNameText>
                                    <S.MentorInfoText>
                                        {campus[mentor.regCode]} {mentor.seq}기{' '}
                                        {mentor.track}
                                    </S.MentorInfoText>
                                </div>
                                <div>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip>
                                            <IconButton sx={{ p: 0 }}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={mentor.profileImg}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </div>
                            </CustomCardMedia>
                            <CardContent style={{ paddingBottom: '0px' }}>
                                <S.MentorExplan>{mentor.intro}</S.MentorExplan>
                                {mentor.tags && mentor.tags.length > 0 ? (
                                    <S.TagList>
                                        {mentor.tags.map((tag, index) => (
                                            <S.TagBox key={index}>
                                                {tag}
                                            </S.TagBox>
                                        ))}
                                    </S.TagList>
                                ) : (
                                    <></>
                                )}
                            </CardContent>
                            <CardActions sx={{ marginTop: 'auto' }}>
                                <CustomButton
                                    size="small"
                                    endIcon={<SendIcon />}
                                    onClick={() => handleOpenModal(mentor.id)}
                                >
                                    쪽지 보내기
                                </CustomButton>
                            </CardActions>
                        </Card>
                    );
                })}
            </S.MentorList>

            <S.Title>새잎</S.Title>
            <S.MenteeList>
                {menteeList.map(mentee => {
                    return (
                        <S.MenteeCard key={mentee.id}>
                            <div>
                                <S.MenteeImg src={mentee.profileImg} />
                                <S.MenteeNickname>
                                    {mentee.nickname}
                                </S.MenteeNickname>
                            </div>
                        </S.MenteeCard>
                    );
                })}
            </S.MenteeList>

            {/* 모달 컴포넌트 추가 */}
            <MessageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                receiver={selectedMentorId}
            />
            <S.FloatingButton onClick={handleChatBotButtonClick} />
            <ChatbotModal
                open={isChatBotModalOpen}
                handleClose={handleChatBotModalClose}
            />
        </S.Container>
    );

    return MainView;
}

export default ShowMembers;
