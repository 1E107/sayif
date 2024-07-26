import S from './style/QuizDetailStyled';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import '../../../styles/fonts.css';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function QuizDetail() {
    const [isSelect, SetIsSelect] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        // 정답인 경우에만 새로고침
        //window.location.reload();
        setOpen(false);
    };

    const handleSelect = index => {
        SetIsSelect(index);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #116530',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    const items = [
        '1. CPU는 데이터를 영구적으로 저장하고, RAM은 데이터를 처리합니다.',
        '2. 데이터베이스는 정보를 저장하는 시스템입니다.',
        '3. 네트워크는 컴퓨터 간의 연결을 제공합니다.',
        '4. 프로그래밍은 문제 해결을 위한 과정입니다.',
    ];

    const QuizDetailView = (
        <div>
            <S.title>퀴즈 문제</S.title>
            <S.Container>
                <S.ChapterTitle>IT 기초 개념 소개</S.ChapterTitle>
                <S.TestTitle>
                    컴퓨터의 중앙 처리 장치(CPU)와 주 기억 장치(RAM)의 역할에
                    대한 설명 중 올바른 것은 무엇입니까?
                </S.TestTitle>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        margin: '10px 50px 10px 50px',
                    }}
                >
                    <nav aria-label="secondary mailbox folders">
                        <List sx={{ textAlign: 'center' }}>
                            {items.map((item, index) => (
                                <ListItem
                                    key={index}
                                    disablePadding
                                    style={{ marginBottom: '10px' }}
                                >
                                    <ListItemButton
                                        style={{
                                            fontFamily: 'ChosunGu',
                                            color:
                                                isSelect === index
                                                    ? '#116530'
                                                    : 'gray',
                                        }}
                                        onClick={() => handleSelect(index)}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    style={{
                                                        fontFamily: 'ChosunGu',
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Box>
                <S.CustomButton variant="contained" onClick={handleOpen}>
                    채점하기
                </S.CustomButton>
            </S.Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CheckIcon
                        style={{ fontSize: '150px', color: '#116530' }}
                    />
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ fontFamily: 'ChosunGu', color: '#116530' }}
                    >
                        정답입니다.
                    </Typography>
                </Box>
                {/* <Box sx={style} style={{ border: '2px solid #BE2E22'}}>
                    <ClearIcon style={{fontSize: "150px", color: "#BE2E22"}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: "ChosunGu", color: "#BE2E22"}}>
                        틀렸습니다.
                    </Typography>
                </Box> */}
            </Modal>
        </div>
    );

    return QuizDetailView;
}

export default QuizDetail;
