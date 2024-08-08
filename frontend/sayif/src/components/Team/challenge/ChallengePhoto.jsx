import { useEffect, useState } from 'react';
import S from './style/PhotoStyled';
import {
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    Box,
    Typography,
} from '@mui/material';
import UploadModal from './UploadModal';
import {
    getDetailChallenge,
    changeMissionStatus,
} from '../../../api/challenge';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChallengeEmpty from '../../LoadingAndEmpty/ChallengeEmpty';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { color } from 'framer-motion';
import { acquireExperience } from '../../../api/config';

function ChallengePhoto() {
    const navigate = useNavigate();
    const [showModal, SetShowModal] = useState(false);
    const { id } = useParams();
    const { token, member } = useSelector(state => state.member);
    const [cardData, SetCardData] = useState([]);

    const [hoverIndex, SetHoverIndex] = useState();

    const handleUploadBtn = () => {
        SetShowModal(true);
    };

    const handleCloseCheck = () => {
        SetShowModal(false);
    };

    const handleNextMissionGet = () => {
        const callChangeStatus = async () => {
            try {
                const response = await changeMissionStatus(id, token);
                if (response.status === 200) {
                    alert('다음 챌린지가 오픈됩니다!');
                    acquireExperience(token,member,5);
                    navigate('/team/challenge');
                }
            } catch (error) {
                if (error.response.status === 400) {
                    alert('더이상 진행할 미션이 없습니다.');
                }
                console.log(error);
            }
        };

        callChangeStatus();
    };

    useEffect(() => {
        const callGetDetail = async () => {
            try {
                const response = await getDetailChallenge(id, token);
                if (response.status === 200) {
                    console.log(response);
                    SetCardData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        callGetDetail();
    }, []);

    const PhotoView = (
        <S.Container>
            <S.TopWrapper>
                <S.Title>챌린지 사진첩</S.Title>
                <S.UploadButton variant="contained" onClick={handleUploadBtn}>
                    사진 올리기
                </S.UploadButton>
            </S.TopWrapper>
            {cardData.length === 0 ? (
                <ChallengeEmpty />
            ) : (
                <>
                    {member.role === 'Mentor' ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '30px',
                            }}
                        >
                            <S.ExplanText>
                                모든 팀원들이 사진을 다 올렸다면 다음 챌린지에
                                도전해볼까요~?
                            </S.ExplanText>
                            <S.NextChallengeBtn onClick={handleNextMissionGet}>
                                다음 미션 받기
                                <NavigateNextIcon
                                    style={{ color: '#116530' }}
                                />
                            </S.NextChallengeBtn>
                        </div>
                    ) : (
                        <></>
                    )}

                    <Grid container spacing={2}>
                        {cardData.map((card, index) => (
                            <Grid item xs={4} key={card.id}>
                                <Card
                                    sx={{ maxWidth: 345 }}
                                    onMouseEnter={() => SetHoverIndex(index)}
                                    onMouseLeave={() => SetHoverIndex(null)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={card.fileUrl}
                                        />
                                        {hoverIndex === index && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform:
                                                        'translate(-50%, -50%)',
                                                    bgcolor:
                                                        'rgba(0, 0, 0, 0.5)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '100%',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <S.CardText>
                                                        {card.memberNickname}
                                                    </S.CardText>
                                                    <S.CardText>
                                                        {card.createdAt}
                                                    </S.CardText>
                                                </div>
                                            </Box>
                                        )}
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
            {showModal && <UploadModal onClose={handleCloseCheck} id={id} />}
        </S.Container>
    );
    return PhotoView;
}

export default ChallengePhoto;
