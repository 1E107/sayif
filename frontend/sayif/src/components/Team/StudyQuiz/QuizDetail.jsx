import S from './style/QuizDetailStyled';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import '../../../styles/fonts.css';

function QuizDetail() {
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
                            {/* 이거 반복문 돌린다 */}
                            <ListItem
                                disablePadding
                                style={{ marginBottom: '10px' }}
                            >
                                <ListItemButton
                                    style={{
                                        fontFamily: 'ChosunGu',
                                        color: 'gray',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={{
                                                    fontFamily: 'ChosunGu',
                                                }}
                                            >
                                                1. CPU는 데이터를 영구적으로
                                                저장하고, RAM은 데이터를
                                                처리합니다.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                style={{ marginBottom: '10px' }}
                            >
                                <ListItemButton
                                    style={{
                                        fontFamily: 'ChosunGu',
                                        color: 'gray',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={{
                                                    fontFamily: 'ChosunGu',
                                                }}
                                            >
                                                1. CPU는 데이터를 영구적으로
                                                저장하고, RAM은 데이터를
                                                처리합니다.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                style={{ marginBottom: '10px' }}
                            >
                                <ListItemButton
                                    style={{
                                        fontFamily: 'ChosunGu',
                                        color: 'gray',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={{
                                                    fontFamily: 'ChosunGu',
                                                }}
                                            >
                                                1. CPU는 데이터를 영구적으로
                                                저장하고, RAM은 데이터를
                                                처리합니다.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                style={{ marginBottom: '10px' }}
                            >
                                <ListItemButton
                                    style={{
                                        fontFamily: 'ChosunGu',
                                        color: 'gray',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={{
                                                    fontFamily: 'ChosunGu',
                                                }}
                                            >
                                                1. CPU는 데이터를 영구적으로
                                                저장하고, RAM은 데이터를
                                                처리합니다.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                <S.CustomButton variant="contained">채점하기</S.CustomButton>
            </S.Container>
        </div>
    );

    return QuizDetailView;
}

export default QuizDetail;
