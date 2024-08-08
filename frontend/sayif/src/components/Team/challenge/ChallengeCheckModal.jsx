import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import S from './style/CheckModalStyled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNowChallenge } from '../../../api/challenge';

function ChallengeCheckModal({ onClose, showModal }) {
    const naviagte = useNavigate();
    const { token, member } = useSelector(state => state.member);
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        onClose();
    };
    const [nowChallenge, SetNowChallenge] = useState(null);

    const handleUpload = () => {
        naviagte(`/team/challenge/photo/${nowChallenge.challengeId}`);
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

    useEffect(() => {
        const callMission = async () => {
            try {
                const response = await getNowChallenge(member.teamId, token);
                if (response.status === 200) {
                    SetNowChallenge(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (showModal) callMission();
    }, [showModal]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <S.Title>지금 진행 중인 챌린지</S.Title>
                {nowChallenge ? (
                    <>
                        <S.Content>
                            {nowChallenge.challengeList.content}
                        </S.Content>
                        <S.SubmitButton
                            variant="outlined"
                            onClick={handleUpload}
                        >
                            사진 확인
                            <AddPhotoAlternateIcon
                                style={{ marginLeft: '5px' }}
                            />
                        </S.SubmitButton>
                    </>
                ) : (
                    <S.Content>챌린지를 가져오고 있어요...!</S.Content>
                )}
            </Box>
        </Modal>
    );
}

export default ChallengeCheckModal;
