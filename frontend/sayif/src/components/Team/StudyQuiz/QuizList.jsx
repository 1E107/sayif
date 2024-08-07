import { useNavigate } from 'react-router-dom';
import S from './style/QuizListStyled';
import { useEffect, useState } from 'react';
import QuizDetail from './QuizDetail';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { getQuizList, GetMySolve } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';

function QuizList() {
    const [showDetail, setShowDetail] = useState(false);
    const { token } = useSelector(state => state.member);
    const [quizList, SetQuizList] = useState([]);
    const [quiz, SetQuiz] = useState();
    const [solvedQuiz, SetSolvedQuiz] = useState([]);

    const handleQuizBtn = data => {
        SetQuiz(data);
        console.log(data);
        setShowDetail(true);
    };

    const handleChange = event => {
        const callQuizList = async () => {
            try {
                const response = await getQuizList(event.target.value, token);
                if (response.status == 200) {
                    SetQuizList(response.data);
                    console.log('퀴즈 리스트-----------');
                    console.log(quizList);
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
    };

    useEffect(() => {
        const callQuizList = async () => {
            try {
                const response = await getQuizList(1, token);
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
    }, []);

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
                            marginBottom: '10px',
                        }}
                    >
                        <S.title>퀴즈 목록</S.title>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl style={{ width: '100px' }}>
                                <NativeSelect
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
                                    <S.PointText>1OOP</S.PointText>
                                    <S.CustomBtn
                                        variant="outlined"
                                        onClick={() => {
                                            handleQuizBtn(quiz);
                                        }}
                                    >
                                        퀴즈 풀기
                                    </S.CustomBtn>
                                </S.QuizWrapper>
                            </S.QuizBox>
                        );
                    })}
                </>
            )}
        </S.Container>
    );
    return QuizListView;
}

export default QuizList;
