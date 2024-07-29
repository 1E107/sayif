import S from './style/SelectMentorStyled'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { getMentorList } from '../../../api/MentoringApi';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#F5F5F5",
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "gray",
    height: "50px",
    fontSize: "12px",
    fontFamily: "ChosunGu"
  }));


function SelectMentor({formData, reSelectInfo, finishPage}) {
    useEffect(()=>{
        const callMentorList = async() => {
            try {
                const response = await SelectMentor(1,10, formData.startDate, formData.endDate, formData.TextAMPM, formData.time);
                console.log(response);c
            }catch(error) {
                console.log(error);
            }
        }

        callMentorList();
    }, []);

    const handleReSelectBtn = () => {
        reSelectInfo();
    };

    const handleApplyBtn = () => {
        // 서버로 신청 정보 넘기고 신청 완료되면 다음 화면으로 넘어가기
        finishPage();
    }

    const SelectMentorView = (
        <S.Container>
            <div>신청 아이콘 보여줌</div>
            {/* <div>{formData.endDate}</div> */}
            <S.Wrapper>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                        <Item>시작일자 <S.explanText>{formData.startDate} ~ {formData.endDate}</S.explanText></Item>
                        </Grid>
                        <Grid item xs={5}>
                        <Item>시간 <S.explanText>{formData.TextAMPM} {formData.time}</S.explanText></Item>
                        </Grid>
                        <Grid item xs>
                            <Item 
                                style={{
                                    color:"#116530",
                                    backgroundColor: "#D4E3DA",
                                    fontSize: "16px",
                                    display: "flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    fontWeight: "bold",
                                }}
                                onClick={handleReSelectBtn}
                                >변경
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </S.Wrapper>
            <S.Wrapper>
                <Grid item xs={5} style={{margin:"15px 0px 15px 0px"}}>
                    <S.MentorListBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>시작일자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;종료일자</S.MentorInfoTitle>
                            <S.MentorInfoContent>07.03 ~ 08.09</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>시간</S.MentorInfoTitle>
                            <S.MentorInfoContent>11:00</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>최소인원</S.MentorInfoTitle>
                            <S.MentorInfoContent>2</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>팀 인원 현황</S.MentorInfoTitle>
                            <S.MentorInfoContent>2/4</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <Button 
                            variant="contained"
                            style={{
                                fontFamily: "ChosunGu",
                                backgroundColor: "#116530",
                                width: "110px",
                                height: "35px",
                                float: "right",
                                borderRadius: "13px"
                            }}
                            onClick={handleApplyBtn}
                        >
                            신청
                        </Button>
                    </S.MentorListBox>
                </Grid>

                {/* 나중에 아래 코드는 없어지고 서버에서 받아온 데이터로 반복문 돌릴 것 */}
                <Grid item xs={5}> 
                    <S.MentorListBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>시작일자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;종료일자</S.MentorInfoTitle>
                            <S.MentorInfoContent>07.03 ~ 08.09</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>시간</S.MentorInfoTitle>
                            <S.MentorInfoContent>11:00</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>최소인원</S.MentorInfoTitle>
                            <S.MentorInfoContent>2</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <S.MentorInfoBox>
                            <S.MentorInfoTitle>팀 인원 현황</S.MentorInfoTitle>
                            <S.MentorInfoContent>2/4</S.MentorInfoContent>
                        </S.MentorInfoBox>
                        <Button 
                        variant="contained"
                        style={{
                            fontFamily: "ChosunGu",
                            backgroundColor: "#116530",
                            width: "110px",
                            height: "35px",
                            float: "right",
                            borderRadius: "13px"
                        }}
                        >
                            신청
                        </Button>
                    </S.MentorListBox>
                </Grid>
            </S.Wrapper>
        </S.Container>
    )

    return SelectMentorView;
}

export default SelectMentor;