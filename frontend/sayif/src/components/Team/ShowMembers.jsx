import S from './style/ShowMemberStyled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import '../../styles/fonts.css';
import { useEffect, useState } from 'react';
import { getMemberInfo } from '../../api/TeamApi';
import { useSelector } from 'react-redux';

const CustomCardMedia = styled(CardMedia)`
    height: 40px;
    background-color: #116530;
    color: white;
    padding: 30px;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
`;

const CustomButton = styled(Button)`
    color: black !important;
    font-family: ChosunGu !important;
    margin-left: 5px !important;
`;

const campus = {
    '101': '부울경',
}

function ShowMembers() {
    const {token, member} = useSelector(state => state.member);
    const [mentorList, SetMentorList] = useState([]);
    const [menteeList, SetMenteeList] = useState([]);

    useEffect(() => {
        const callMemberInfo = async() => {
            try {
                const response = await getMemberInfo(member.team_id, token);
                if(response.status == 200) {
                    const mentee = response.data.filter(member => member.role === 'Mentee');
                    const mentor = response.data.filter(member => member.role === "Mentor");
                    SetMentorList(mentor);
                    SetMenteeList(mentee);
                }
            } catch(error) {
                console.log(error);
            }
        }
        callMemberInfo();
    }, []);

    const MainView = (
        <S.Container>
            <S.Title>단비</S.Title>
            <S.MentorList>
                {/* 멘토 반복문 시작 */}
                {
                    mentorList.map((mentor) => {
                        return(
                            <Card sx={{ width: 400, height: 260, borderRadius: '30px', display: 'flex', flexDirection: 'column' }}>
                                <CustomCardMedia>
                                    <div>
                                        <S.MentorNameText>{mentor.nickname}</S.MentorNameText>
                                        <S.MentorInfoText>{campus[mentor.reg_code]} {mentor.seq}기 {mentor.track}</S.MentorInfoText>
                                    </div>
                                    <div>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip>
                                                <IconButton sx={{ p: 0 }}>
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src="/static/images/avatar/2.jpg"
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </div>
                                </CustomCardMedia>
                                <CardContent style={{ paddingBottom: '0px' }}>
                                    <S.MentorExplan>
                                        {mentor.intro}
                                    </S.MentorExplan>
                                    <S.TagList>
                                        {/* 태그도 서버에서 데이터 가져와서 반복문 돌립니다 */}
                                        <S.TagBox>ISFJ</S.TagBox>
                                    </S.TagList>
                                </CardContent>
                                <CardActions sx={{marginTop: "auto"}}>
                                    <CustomButton size="small" endIcon={<SendIcon />}>
                                        쪽지 보내기 ··{' '}
                                    </CustomButton>
                                </CardActions>
                            </Card>
                        )
                    })
                }               
            </S.MentorList>

            <S.Title>새잎</S.Title>
            <S.MenteeList>
                {/* 멘티 리스트 반복문 돌립니다 */}
                {menteeList.map((mentee) => {
                    return(
                        <S.MenteeCard>
                            <div>
                                <S.MenteeImg src="/basic-profile.png"></S.MenteeImg>
                                <S.MenteeNickname>{mentee.nickname}</S.MenteeNickname>
                            </div>
                        </S.MenteeCard>
                    )
                })}
            </S.MenteeList>
        </S.Container>
    );

    return MainView;
}

export default ShowMembers;
