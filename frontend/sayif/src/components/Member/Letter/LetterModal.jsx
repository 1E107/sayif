import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getDetail } from '../../../api/Letter';
import { useSelector } from 'react-redux';
import S from './style/ModalStyled';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/config';

function LetterModal({ onClose, id }) {
    const { token, member } = useSelector(state => state.member);
    const [open, setOpen] = useState(true);
    const [detailContent, SetDetailContent] = useState({});
    const [showSendForm, SetShowSendForm] = useState(false);
    const [sendTitle, SetSendTitle] = useState('제목');
    const [sendContent, SetSendContent] = useState('내용');

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleShowForm = () => {
        SetShowSendForm(true);
    };

    const handleSubmitLetter = async () => {
        if (!sendTitle || !sendContent) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }

        try {
            console.log({
                receiver: detailContent.sendMemberId,
                title: sendTitle,
                content: sendContent,
            });

            const response = await axios.post(
                `${API_BASE_URL}/member/message`,
                {
                    receiver: detailContent.sendMemberId,
                    title: sendTitle,
                    content: sendContent,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            if (response.status === 200) {
                alert('쪽지가 전송되었습니다.');
                SetSendTitle('제목');
                SetSendContent('내용');
                onClose();
            } else {
                alert('쪽지 전송에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('전송 오류:', error);
            alert('서버와의 연결에 실패했습니다. 나중에 다시 시도해 주세요.');
        }
    };

    const handleChangeTitle = e => {
        SetSendTitle(e.target.value);
    };

    const handleChangeContent = e => {
        SetSendContent(e.target.value);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid black',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const callGetDetail = async () => {
            try {
                const response = await getDetail(token, id);
                if (response.status === 200) {
                    SetDetailContent(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callGetDetail();
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <S.Text
                    style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                    }}
                >
                    {detailContent.title}
                </S.Text>
                <S.Text
                    style={{
                        borderBottom: 'solid 1px #dee2e6',
                        paddingBottom: '20px',
                    }}
                >
                    {detailContent.createdAt} | {detailContent.sendId}
                </S.Text>
                <S.Text
                    style={{
                        fontSize: '20px',
                        border: 'solid 1px #dee2e6',
                        borderRadius: '10px',
                        height: '200px',
                        padding: '10px',
                    }}
                >
                    {detailContent.content}
                </S.Text>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {showSendForm ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <S.InputTitle
                                onChange={handleChangeTitle}
                                placeholder={sendTitle}
                            ></S.InputTitle>
                            <S.InputContent
                                onChange={handleChangeContent}
                                placeholder={sendContent}
                            ></S.InputContent>
                            <S.SendBtn
                                variant="contained"
                                onClick={handleSubmitLetter}
                            >
                                쪽지 전송
                            </S.SendBtn>
                        </div>
                    ) : (
                        <S.SendBtn variant="contained" onClick={handleShowForm}>
                            답장하기
                        </S.SendBtn>
                    )}
                </div>
            </Box>
        </Modal>
    );
}

export default LetterModal;
