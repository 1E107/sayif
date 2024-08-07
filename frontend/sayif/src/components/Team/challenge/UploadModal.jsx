import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import S from './style/UploadStyled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';

function UploadModal({ onClose }) {
    const fileInputRef = useRef(null);

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            console.log('선택한 파일 : ', file);
        }
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
                <S.Title>사진을 업로드 해볼까요?</S.Title>
                <img
                    src="/img/NoImage.png"
                    alt="Upload"
                    onClick={handleImageClick}
                    style={{
                        cursor: 'pointer',
                        width: '250px',
                        height: 'auto',
                    }}
                ></img>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                ></input>
                <S.ExplanText>
                    이미지를 클릭해서 파일을 업로드해주세요!
                </S.ExplanText>
                <S.PostBtn variant="outlined">사진 전송</S.PostBtn>
                <S.ResultText>
                    보내주신 사진을 보니{' '}
                    <S.ResultHigh>귀여운 토끼</S.ResultHigh>로 인식되었어요.
                    정말 멋진 사진이에요!
                </S.ResultText>
            </Box>
        </Modal>
    );
}

export default UploadModal;
