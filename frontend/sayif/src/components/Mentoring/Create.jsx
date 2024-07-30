import S from './style/CreateStyled'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';
import '../../styles/fonts.css';

function Create() {
    const [otherMentor, SetOtherMentor] = useState("오복");

    const handleChange = event => {
        console.log(event.target.value);
        SetOtherMentor(event.target.value);
    };

    const CreateView = (
        <>
            <S.Title>멘토 그룹 생성</S.Title>
            <S.ExplainText>멘토링을 같이 할 멤버를 선택해 멘토링을 꾸려보세요.</S.ExplainText>
            <S.Container>
                <S.CustomTable>
                        <tr>
                            <S.CustomTdTitle>멘토링 팀원</S.CustomTdTitle>
                            <S.CustomTdContent>
                                <div style={{display: "flex"}}>
                                    <S.MentorTitle style={{margin: "0px 20px 10px 0px"}}>팀장</S.MentorTitle>
                                    <div>메루</div>
                                </div>
                                <div style={{display: "flex"}}>
                                    <S.MentorTitle style={{margin: "10px 20px 0px 0px"}}>팀원</S.MentorTitle>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl style={{ width: '100px' }}>
                                            <NativeSelect
                                                defaultValue={10}
                                                onChange={handleChange}
                                                style={{fontFamily: "ChosunGu"}}
                                            >
                                                {/* 나중에 반복문 돌림 멘토 리스트 받아와서 */}
                                                <option value={"오복"}>오복</option>
                                                <option value={"컷"}>컷</option>
                                                <option value={"뱅"}>뱅</option>
                                                <option value={"소라"}>소라</option>
                                                <option value={"고동"}>고동</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>
                                </div>

                            </S.CustomTdContent>
                        </tr>
                        <tr>
                            <S.CustomTdTitle>멘토링 시작 날짜</S.CustomTdTitle>
                            <S.CustomTdContent>팀장</S.CustomTdContent>
                        </tr>
                        <tr>
                            <S.CustomTdTitle>멘토링 요일</S.CustomTdTitle>
                            <S.CustomTdContent>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <S.CustomDayBtn variant="outlined">월</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">화</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">수</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">목</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">금</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">토</S.CustomDayBtn>
                                    <S.CustomDayBtn variant="outlined">일</S.CustomDayBtn>
                                </div>
                            </S.CustomTdContent>
                        </tr>
                        <tr>
                            <S.CustomTdTitle>멘토링 시간</S.CustomTdTitle>
                            <S.CustomTdContent>팀장</S.CustomTdContent>
                        </tr>
                </S.CustomTable>
            </S.Container>
            <S.BtnGroup>
                <S.CustomCancelBtn variant="contained">취소</S.CustomCancelBtn>
                <S.CustomRegistBtn variant="contained">완료</S.CustomRegistBtn>
            </S.BtnGroup>
        </>
    );

    return CreateView;
}

export default Create;