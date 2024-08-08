import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getDetail } from '../../api/Letter';
import { useSelector } from 'react-redux';

function LetterModal({ onClose, id }) {
    const { token, member } = useSelector(state => state.member);
    const [open, setOpen] = useState(true);
    const [detailContent, SetDetailContent] = useState({});

    const handleClose = () => {
        setOpen(false);
        onClose();
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
        const callGetDetail = async () => {
            try {
                const response = await getDetail(token, id);
                if (response.status === 200) {
                    SetDetailContent(response.data);
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
                {detailContent.title}
                {detailContent.content}
                {detailContent.createdAt}
                {detailContent.sendId}
            </Box>
        </Modal>
    );
}

export default LetterModal;
