import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import S from './style/NoTeamModalStyled';
import WarningIcon from '@mui/icons-material/Warning';

function NoTeamModal({onClose}) {
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
            <WarningIcon style={{fontSize: "100px", color: "#116530"}}/>
            <S.titleText> 현재 진행 중인 멘토링이 없습니다.</S.titleText>
            <S.contentText>하지만 걱정하지 마세요! 멘토링은 <span style={{color: "#BA9C03"}}>언제든지</span> 신청하실 수 있습니다. <S.highlight>멘토링 - 멘토링 신청</S.highlight> 페이지에서 여러분의 멘토를 만나보세요. 함께 성장할 수 있는 좋은 기회가 기다리고 있답니다!</S.contentText>
        </Box>
    </Modal>
    )
}

export default NoTeamModal;