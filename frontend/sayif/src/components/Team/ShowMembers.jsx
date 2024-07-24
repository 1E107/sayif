import S from './style/ShowMemberStyled';
import * as React from 'react';
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

function ShowMembers() {
    const MainView = (
        <S.Container>
            <S.Title>단비</S.Title>
            <S.MentorList>
                {/* 멘토 반복문 시작 */}
                <Card sx={{ maxWidth: 400, borderRadius: '30px' }}>
                    <CustomCardMedia>
                        <div>
                            <S.MentorNameText>Sora</S.MentorNameText>
                            <S.MentorInfoText>부울경 11기 웹</S.MentorInfoText>
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
                            공감과 소통을 중시하는 멘토와 함께 즐겁게 배우는
                            코딩, 누구나 쉽게 따라올 수 있도록 재미있고 이해하기
                            쉽게 설명해드립니다.
                        </S.MentorExplan>
                        <S.TagList>
                            {/* 태그도 서버에서 데이터 가져와서 반복문 돌립니다 */}
                            <S.TagBox>ISFJ</S.TagBox>
                        </S.TagList>
                    </CardContent>
                    <CardActions>
                        <CustomButton size="small" endIcon={<SendIcon />}>
                            쪽지 보내기 ··{' '}
                        </CustomButton>
                    </CardActions>
                </Card>
                {/* 멘토 반복문 끝 */}
                <Card sx={{ maxWidth: 400, borderRadius: '30px' }}>
                    <CustomCardMedia>
                        <div>
                            <S.MentorNameText>Sora</S.MentorNameText>
                            <S.MentorInfoText>부울경 11기 웹</S.MentorInfoText>
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
                            공감과 소통을 중시하는 멘토와 함께 즐겁게 배우는
                            코딩, 누구나 쉽게 따라올 수 있도록 재미있고 이해하기
                            쉽게 설명해드립니다.
                        </S.MentorExplan>
                        <S.TagList>
                            {/* 태그도 서버에서 데이터 가져와서 반복문 돌립니다 */}
                            <S.TagBox>ISFJ</S.TagBox> <S.TagBox>행복</S.TagBox>{' '}
                            <S.TagBox>행복</S.TagBox> <S.TagBox>행복</S.TagBox>
                        </S.TagList>
                    </CardContent>
                    <CardActions>
                        <CustomButton size="small" endIcon={<SendIcon />}>
                            쪽지 보내기 ··{' '}
                        </CustomButton>
                    </CardActions>
                </Card>
            </S.MentorList>

            <S.Title>새잎</S.Title>
            <S.MenteeList>
                {/* 멘티 리스트 반복문 돌립니다 */}
                <S.MenteeCard>
                    <div>
                        <S.MenteeImg src="/basic-profile.png"></S.MenteeImg>
                        <S.MenteeNickname>메루</S.MenteeNickname>
                    </div>
                </S.MenteeCard>
                <S.MenteeCard>
                    <div>
                        <S.MenteeImg src="/basic-profile.png"></S.MenteeImg>
                        <S.MenteeNickname>메루</S.MenteeNickname>
                    </div>
                </S.MenteeCard>
                <S.MenteeCard>
                    <div>
                        <S.MenteeImg src="/basic-profile.png"></S.MenteeImg>
                        <S.MenteeNickname>메루</S.MenteeNickname>
                    </div>
                </S.MenteeCard>
                <S.MenteeCard>
                    <div>
                        <S.MenteeImg src="/basic-profile.png"></S.MenteeImg>
                        <S.MenteeNickname>메루</S.MenteeNickname>
                    </div>
                </S.MenteeCard>
            </S.MenteeList>
        </S.Container>
    );

    return MainView;
}

export default ShowMembers;
