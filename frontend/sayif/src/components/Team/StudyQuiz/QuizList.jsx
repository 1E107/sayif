import { useNavigate } from 'react-router-dom';
import S from './style/QuizListStyled';
import { useEffect, useState } from 'react';
import QuizDetail from './QuizDetail';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { getQuizList, GetMySolve } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import ChatbotModal from '../ChatBotModal';

function QuizList() {
    const [showDetail, setShowDetail] = useState(false);
    const { token } = useSelector(state => state.member);
    const [quizList, SetQuizList] = useState([]);
    const [quiz, SetQuiz] = useState();
    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);
    const [solvedQuiz, SetSolvedQuiz] = useState([]);
    const [selectChapter, SetSelectChapter] = useState(() => {
        const savedChapter = localStorage.getItem('selectChapter');
        return savedChapter ? Number(savedChapter) : 1;
    });

    const handleQuizBtn = data => {
        SetQuiz(data);
        setShowDetail(true);
    };

    const handleChatBotButtonClick = () => {
        setIsChatBotModalOpen(true); // ChatBotModal을 염
    };

    const handleChatBotModalClose = () => {
        setIsChatBotModalOpen(false); // ChatBotModal을 닫음
    };

    const handleChange = event => {
        const newChapter = Number(event.target.value);
        SetSelectChapter(event.target.value);
        localStorage.setItem('selectChapter', newChapter);
    };

    useEffect(() => {
        const callQuizList = async () => {
            const savedChapter = localStorage.getItem('selectChapter');
            if (savedChapter) {
                SetSelectChapter(Number(savedChapter));
            }

            try {
                const response = await getQuizList(savedChapter, token);
                if (response.status == 200) {
                    SetQuizList(response.data);

                    const results = await Promise.all(
                        response.data.map(async quiz => {
                            const isSolveRes = await GetMySolve(quiz.id, token);
                            return { id: quiz.id, solved: isSolveRes.data };
                        }),
                    );
                    const solvedMapping = results.reduce(
                        (acc, { id, solved }) => {
                            acc[id] = solved;
                            return acc;
                        },
                        {},
                    );

                    SetSolvedQuiz(solvedMapping);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callQuizList();
    }, [selectChapter]);

    const QuizListView = (
        <S.Container>
            {showDetail ? (
                <QuizDetail quiz={quiz}></QuizDetail>
            ) : (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <S.title>퀴즈 목록</S.title>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl style={{ width: '100px' }}>
                                <NativeSelect
                                    value={selectChapter}
                                    defaultValue={10}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    style={{ color: '#116530' }}
                                    onChange={handleChange}
                                >
                                    <option value={1}>chapter 1</option>
                                    <option value={2}>chapter 2</option>
                                    <option value={3}>chapter 3</option>
                                    <option value={4}>chapter 4</option>
                                    <option value={5}>chapter 5</option>
                                    <option value={6}>chapter 6</option>
                                    <option value={7}>chapter 7</option>
                                    <option value={8}>chapter 8</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </div>
                    {quizList.map((quiz, index) => {
                        return (
                            <S.QuizBox
                                style={{
                                    opacity:
                                        solvedQuiz[quiz.id] === true ? 0.5 : 1,
                                    backgroundColor:
                                        solvedQuiz[quiz.id] === true
                                            ? '#f1f3f5'
                                            : 'white',
                                    pointerEvents:
                                        solvedQuiz[quiz.id] === true
                                            ? 'none'
                                            : 'auto',
                                }}
                            >
                                <S.QuizWrapper>
                                    <S.QuizNumber>{index + 1}</S.QuizNumber>
                                    <S.QuizTitle>{quiz.question}</S.QuizTitle>
                                </S.QuizWrapper>
                                <S.QuizWrapper>
                                    <S.PointText>1OP</S.PointText>
                                    <S.CustomBtn
                                        variant="outlined"
                                        onClick={() => {
                                            handleQuizBtn(quiz);
                                        }}
                                    >
                                        {solvedQuiz[quiz.id] === true
                                            ? '퀴즈 성공'
                                            : '퀴즈 풀기'}
                                    </S.CustomBtn>
                                </S.QuizWrapper>
                            </S.QuizBox>
                        );
                    })}
                </>
            )}
            <S.FloatingButton onClick={handleChatBotButtonClick} />
            <ChatbotModal
                open={isChatBotModalOpen}
                handleClose={handleChatBotModalClose}
            />
        </S.Container>
    );
    return QuizListView;
}

export default QuizList;
