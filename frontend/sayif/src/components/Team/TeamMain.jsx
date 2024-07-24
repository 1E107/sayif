import S from './style/TeamMainStyled';
import CreateIcon from '@mui/icons-material/Create';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';

const CustomLinearProgress = styled(LinearProgress)({
    padding: '10px',
    margin: '20px 10px 10px 10px',
    width: '250px',
    borderRadius: '10px',
    backgroundColor: '#E8E8CC !important',
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#116530',
    },
});

function TeamMain() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [progress, setProgress] = React.useState(30);

    const MainView = (
        <S.Container>
            <S.Wrapper>
                <S.ImageBox></S.ImageBox>
                <S.TeamNameText>
                    새이프
                    <CreateIcon
                        style={{ color: '#DED3A6', marginLeft: '10px' }}
                    />
                </S.TeamNameText>
                <S.ScoreContainer>
                    <S.TeamScoreText>135</S.TeamScoreText>
                    <CustomLinearProgress
                        variant="determinate"
                        value={progress}
                    />
                </S.ScoreContainer>
            </S.Wrapper>
        </S.Container>
    );

    return MainView;
}

export default TeamMain;
