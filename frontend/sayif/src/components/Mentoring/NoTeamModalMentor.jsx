import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import S from './style/NoTeamModalStyled';
import WarningIcon from '@mui/icons-material/Warning';

function NoTeamNodalMentor({ onClose }) {
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <WarningIcon style={{ fontSize: '100px', color: '#116530' }} />
                <S.titleText> 현재 진행 중인 멘토링이 없습니다.</S.titleText>
                <S.contentText>
                    하지만 걱정하지 마세요! 멘토링은{' '}
                    <span style={{ color: '#BA9C03' }}>언제든지</span> 신청하실
                    수 있습니다.{' '}
                    <S.highlight>멘토링 - 멘토링 그룹 생성</S.highlight>{' '}
                    페이지에서 팀을 생성하고 멘티와 함께 하세요 !
                </S.contentText>
            </Box>
        </Modal>
    );
}

export default NoTeamNodalMentor;
