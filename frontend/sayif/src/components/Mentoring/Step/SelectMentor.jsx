import S from './style/SelectMentorStyled';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { applyMentoring, getMentorList } from '../../../api/MentoringApi';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#F5F5F5',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'gray',
    height: '50px',
    fontSize: '12px',
    fontFamily: 'ChosunGu',
}));

function SelectMentor({ formData, reSelectInfo, finishPage }) {
    const [mentorList, setMentorList] = useState([]);
    const { token } = useSelector(state => state.member);

    useEffect(() => {
        const callMentorList = async () => {
            try {
                const response = await getMentorList(
                    0,
                    10,
                    formData.startDate,
                    formData.endDate,
                    formData.TextAMPM,
                    formData.time,
                    token,
                );
                console.log(response.data);
                setMentorList(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        callMentorList();
    }, []);

    const handleReSelectBtn = () => {
        reSelectInfo();
    };

    const handleApplyBtn = id => {
        const callApplyMentoring = async () => {
            try {
                const response = await applyMentoring(id, token);
                if (response.status === 200)
                    alert('멘토링 신청이 완료되었습니다.');
            } catch (error) {
                console.log(error);
            }
        };
        callApplyMentoring();
        finishPage();
    };

    return (
        <S.Container>
            <S.IconWrapper>
                <S.Icon />
            </S.IconWrapper>
            {/* <div>{formData.endDate}</div> */}
            <S.Wrapper>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                            <Item>
                                시작일자{' '}
                                <S.explanText>
                                    {formData.startDate} ~ {formData.endDate}
                                </S.explanText>
                            </Item>
                        </Grid>
                        <Grid item xs={5}>
                            <Item>
                                시간{' '}
                                <S.explanText>
                                    {formData.TextAMPM} {formData.time}
                                </S.explanText>
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Item
                                style={{
                                    color: '#116530',
                                    backgroundColor: '#D4E3DA',
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                }}
                                onClick={handleReSelectBtn}
                            >
                                변경
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </S.Wrapper>
            <S.Wrapper>
                {mentorList.map(mentor => {
                    return (
                        <Grid
                            key={mentor.id}
                            item
                            xs={5}
                            style={{ margin: '15px 0px 15px 0px' }}
                        >
                            <S.MentorListBox>
                                <S.MentorInfoBox>
                                    <S.MentorProfileWrapper>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <IconButton sx={{ p: 0 }}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={
                                                        mentor.mentor1ProfileUrl
                                                    }
                                                />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <IconButton sx={{ p: 0 }}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={
                                                        mentor.mentor2ProfileUrl
                                                    }
                                                />
                                            </IconButton>
                                        </Box>
                                    </S.MentorProfileWrapper>
                                    <S.MentorInfoContent
                                        style={{ marginBottom: '15px' }}
                                    >
                                        {mentor.mentor1Nickname} &{' '}
                                        {mentor.mentor2Nickname}
                                    </S.MentorInfoContent>
                                </S.MentorInfoBox>
                                <S.MentorInfoBox>
                                    <S.MentorInfoTitle>
                                        시작일자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;종료일자
                                    </S.MentorInfoTitle>
                                    <S.MentorInfoContent>
                                        {mentor.startDate} ~ {mentor.endDate}
                                    </S.MentorInfoContent>
                                </S.MentorInfoBox>
                                <S.MentorInfoBox>
                                    <S.MentorInfoTitle>시간</S.MentorInfoTitle>
                                    <S.MentorInfoContent>
                                        {mentor.pmam} {mentor.time}
                                    </S.MentorInfoContent>
                                </S.MentorInfoBox>
                                <S.MentorInfoBox>
                                    <S.MentorInfoTitle>
                                        팀 인원 현황
                                    </S.MentorInfoTitle>
                                    <S.MentorInfoContent>
                                        {mentor.menteeCnt}/4
                                    </S.MentorInfoContent>
                                </S.MentorInfoBox>
                                <Button
                                    variant="contained"
                                    style={{
                                        fontFamily: 'ChosunGu',
                                        backgroundColor: '#116530',
                                        width: '110px',
                                        height: '35px',
                                        float: 'right',
                                        borderRadius: '13px',
                                    }}
                                    onClick={() => {
                                        handleApplyBtn(mentor.id);
                                    }}
                                >
                                    신청
                                </Button>
                            </S.MentorListBox>
                        </Grid>
                    );
                })}
            </S.Wrapper>
        </S.Container>
    );
}

export default SelectMentor;
