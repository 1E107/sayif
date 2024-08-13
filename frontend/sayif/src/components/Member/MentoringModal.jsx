import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import S from './style/MentoringModalStyled'
import { useState,useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { getMemberInfo } from '../../api/TeamApi';
import { applyMentoring,getTeamInfo } from '../../api/MentoringApi';

function MentoringModal({onClose}) {
    const [open, setOpen] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]); // 팀원 정보를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const { token, member } = useSelector(state => state.member);
    const [teamnumbers,setTeamNumbers] = useState(0);
    const [teaminfos, setTeamInfos] = useState([]);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid black',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const members = await getMemberInfo(member.teamId, token);
                const mentoringplans = await applyMentoring(member.teamId,token);
                const teaminfos = await getTeamInfo(member.teamId,token);
                console.log(teaminfos.data);
                setTeamNumbers(mentoringplans);
                setTeamInfos(teaminfos.data);
                setTeamMembers(members.data); // API 응답 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching team members:', error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchTeamMembers();
    }, [member.teamId, token]); // teamId와 token이 변경될 때마다 API 호출

    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <S.Title>팀 신청 현황</S.Title>
            <S.Content>
                <S.ContentText style={{paddingTop: "10px"}}>멘토 현황</S.ContentText>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", padding: "10px"}}>
                    {teamMembers
                        .filter(mentor => mentor.role === "Mentor") // role이 Mentor인 멤버만 필터링
                        .map((mentor, index) => (
                        <div key={index}>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={mentor.name}>
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar
                                            alt={mentor.name}
                                            src={mentor.profileImg} // 멤버의 아바타 URL 사용
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <S.MentorNameText>{mentor.nickname}</S.MentorNameText> {/* 멤버 이름 표시 */}
                        </div>
                    ))}
                </div>
            </S.Content>
            <S.BottomWrapper>
                <div style={{display: "flex", justifyContent:"center", marginTop: "20px", gap: "15px"}}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>신청인원 / 총인원</S.ContentText>
                        <S.ContentData>{teamnumbers.data} / 4</S.ContentData>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>마감기한</S.ContentText>
                        <S.ContentData>{teaminfos.deadlineDate}</S.ContentData>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>시작일</S.ContentText>
                        <S.ContentData>{teaminfos.startDate}</S.ContentData>
                    </div>
                </div>
            </S.BottomWrapper>
        </Box>
    </Modal>
    )
}

export default MentoringModal;