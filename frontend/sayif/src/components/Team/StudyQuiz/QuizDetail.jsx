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
import { useSelector } from 'react-redux';
import { acquireExperience } from '../../../api/config';
import { CheckSolveQuiz } from '../../../api/TeamApi';

function QuizDetail({ quiz }) {
    const [isSelect, SetIsSelect] = useState('');
    const [open, SetOpen] = useState(false);
    const [isCorrect, SetIsCorrect] = useState(false);
    const [openCorrect, SetOpenCorrect] = useState(false);
    const { token, member } = useSelector(state => state.member);

    const handleOpen = async () => {
        if (isCorrect) {
            SetOpenCorrect(true);
            acquireExperience(token, member, 10);
            CheckSolveQuiz(quiz.id, token);
        }
        SetOpen(true);
    };
    const handleClose = () => {
        SetOpen(false);
        if (isCorrect) window.location.reload();
    };

    const handleSelect = (index, correct) => {
        SetIsCorrect(correct);
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

    const QuizDetailView = (
        <div>
            <S.title>퀴즈 문제</S.title>
            <S.Container>
                <S.TestTitle>{quiz.question}</S.TestTitle>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        margin: '10px 50px 10px 50px',
                    }}
                >
                    <nav aria-label="secondary mailbox folders">
                        <List sx={{ textAlign: 'center' }}>
                            {quiz.quizChoiceDto.map((item, index) => (
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
                                            backgroundColor:
                                                isSelect === index
                                                    ? '#e9ecef'
                                                    : 'white',
                                        }}
                                        onClick={() =>
                                            handleSelect(index, item.isAnswer)
                                        }
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    style={{
                                                        fontFamily: 'ChosunGu',
                                                    }}
                                                >
                                                    {index + 1}. {item.content}
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
                {openCorrect ? (
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
                ) : (
                    <Box sx={style} style={{ border: '2px solid #BE2E22' }}>
                        <ClearIcon
                            style={{ fontSize: '150px', color: '#BE2E22' }}
                        />
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            style={{ fontFamily: 'ChosunGu', color: '#BE2E22' }}
                        >
                            틀렸습니다.
                        </Typography>
                    </Box>
                )}
            </Modal>
        </div>
    );

    return QuizDetailView;
}

export default QuizDetail;
