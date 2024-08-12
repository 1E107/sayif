import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import S from './style/MentoringModalStyled'
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

function MentoringModal({onClose}) {
    const [open, setOpen] = useState(true);
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
                    <div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <S.MentorNameText>sora</S.MentorNameText>
                    </div>
                    <div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <S.MentorNameText>meru</S.MentorNameText>
                    </div>
                </div>
            </S.Content>
            <S.BottomWrapper>
                <div style={{display: "flex", justifyContent:"center", marginTop: "20px", gap: "15px"}}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>신청인원 / 총인원</S.ContentText>
                        <S.ContentData>/ 4</S.ContentData>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>마감기한</S.ContentText>
                        <S.ContentData></S.ContentData>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <S.ContentText>시작일</S.ContentText>
                        <S.ContentData></S.ContentData>
                    </div>
                </div>
            </S.BottomWrapper>
        </Box>
    </Modal>
    )
}

export default MentoringModal;