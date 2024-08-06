import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import S from './style/CheckModalStyled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';

function ChallengeCheckModal({ onClose }) {
    const naviagte = useNavigate();
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleUpload = () => {
        naviagte('/team/challenge/photo');
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
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
                <S.Title>지금 진행 중인 챌린지</S.Title>
                <img
                    src="/img/challenge/cat.png"
                    style={{ width: '200px', margin: '30px' }}
                />
                <S.Content>고양이 사진을 찍어서 올려봅시다!</S.Content>
                <S.SubmitButton variant="outlined" onClick={handleUpload}>
                    사진 확인
                    <AddPhotoAlternateIcon style={{ marginLeft: '5px' }} />
                </S.SubmitButton>
            </Box>
        </Modal>
    );
}

export default ChallengeCheckModal;
