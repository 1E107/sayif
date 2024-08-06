import { useState } from 'react';
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

function ChallengePhoto() {
    const [showModal, SetShowModal] = useState(false);

    const cardsData = [
        {
            id: 1,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 1',
        },
        {
            id: 2,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 2',
        },
        {
            id: 3,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 3',
        },
        {
            id: 4,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 4',
        },
        {
            id: 5,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 5',
        },
        {
            id: 6,
            image: '/img/Challenge/challenge-basic.jfif',
            alt: 'Challenge 6',
        },
    ];

    const [hoverIndex, SetHoverIndex] = useState();

    const handleUploadBtn = () => {
        SetShowModal(true);
    };

    const handleCloseCheck = () => {
        SetShowModal(false);
    };

    const PhotoView = (
        <S.Container>
            <S.TopWrapper>
                <S.Title>챌린지 사진첩</S.Title>
                <S.UploadButton variant="contained" onClick={handleUploadBtn}>
                    사진 올리기
                </S.UploadButton>
            </S.TopWrapper>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => (
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
                                    image="/img/Challenge/challenge-basic.jfif"
                                />
                                {hoverIndex === index && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <S.CardText>사용자 닉네임</S.CardText>
                                    </Box>
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {showModal && <UploadModal onClose={handleCloseCheck} />}
        </S.Container>
    );
    return PhotoView;
}

export default ChallengePhoto;
