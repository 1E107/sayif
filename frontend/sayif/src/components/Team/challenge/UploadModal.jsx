import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import S from './style/UploadStyled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { tryChallenge, submitPhoto, getMyImg } from '../../../api/challenge';
import { useSelector } from 'react-redux';

function UploadModal({ onClose, id, challengeId }) {
    const fileInputRef = useRef(null);
    const { token, member } = useSelector(state => state.member);
    const [open, SetOpen] = useState(true);
    const [file, SetFile] = useState();
    const [result, SetResult] = useState(undefined);
    const [imgUrl, setImgUrl] = useState('/img/NoImage.png');
    const handleClose = () => {
        SetOpen(false);
        onClose();
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const selectFile = event.target.files[0];
        if (selectFile) {
            SetFile(selectFile);
            const url = URL.createObjectURL(selectFile);
            setImgUrl(url);
        }
    };

    const handleUploadBtn = () => {
        console.log('AI에게 사진을 전송합니다...');
        const callTry = async () => {
            try {
                const response = await tryChallenge(challengeId, token, file);
                if (response.status === 200) {
                    console.log(response);
                    SetResult(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callTry();
    };

    const handleFinishBtn = () => {
        const callSubmitPhoto = async () => {
            try {
                const response = await submitPhoto(id, file, token);
                if (response.status === 200) {
                    alert('사진이 성공적으로 업로드되었습니다!');
                    handleClose();
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        };
        callSubmitPhoto();
    };

    useEffect(() => {
        const callMyImg = async () => {
            try {
                const response = await getMyImg(id, token);
                if (response.status === 200) {
                    setImgUrl(response.data);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        callMyImg();
    }, []);

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
                    src={imgUrl}
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
                {result == undefined ? (
                    <S.PostBtn variant="outlined" onClick={handleUploadBtn}>
                        사진 전송
                    </S.PostBtn>
                ) : (
                    <S.FinishBtn variant="contained" onClick={handleFinishBtn}>
                        사진 올리기
                    </S.FinishBtn>
                )}
                {result == undefined ? (
                    <></>
                ) : !result ? (
                    <S.ResultText>
                        아쉽게도 이 사진에서는 대상을 인식하지 못했어요. 다시 한
                        번 사진을 찍어보실래요? 그대로 올려도 챌린지 수행에는
                        문제가 없어요~^^
                    </S.ResultText>
                ) : (
                    <S.ResultText>
                        보내주신 사진이 잘 인식되었어요! 훌륭한 사진입니다!
                        팀원들에게 자랑해볼까요~?
                    </S.ResultText>
                )}
            </Box>
        </Modal>
    );
}

export default UploadModal;
