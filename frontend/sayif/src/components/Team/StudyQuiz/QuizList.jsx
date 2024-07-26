import { useNavigate } from 'react-router-dom';
import S from './style/QuizListStyled';
import { useState } from 'react';
import QuizDetail from './QuizDetail';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function QuizList() {
    const [showDetail, setShowDetail] = useState(false);
    const [chapter, SetChapter] = useState(1);

    const handleQuizBtn = () => {
        setShowDetail(true); // QuizDetail 컴포넌트 출력할 때 클릭한 퀴즈에 대한 내용을 넘겨줌
    };

    const handleChange = event => {
        console.log(event.target.value);
        SetChapter(event.target.value);
    };

    const QuizListView = (
        <S.Container>
            {showDetail ? (
                <QuizDetail></QuizDetail>
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

                    <S.QuizBox>
                        <S.QuizWrapper>
                            <S.QuizNumber>3</S.QuizNumber>
                            <S.QuizTitle>코딩 기초</S.QuizTitle>
                        </S.QuizWrapper>
                        <S.QuizWrapper>
                            <S.PointText>1OOP</S.PointText>
                            <S.CustomBtn
                                variant="outlined"
                                onClick={handleQuizBtn}
                            >
                                퀴즈 풀기
                            </S.CustomBtn>
                        </S.QuizWrapper>
                    </S.QuizBox>
                    <S.QuizBox></S.QuizBox>
                    <S.QuizBox></S.QuizBox>
                </>
            )}
        </S.Container>
    );
    return QuizListView;
}

export default QuizList;
