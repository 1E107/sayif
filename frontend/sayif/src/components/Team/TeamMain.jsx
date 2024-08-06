import S from './style/TeamMainStyled';
import CreateIcon from '@mui/icons-material/Create';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';
import '../../styles/fonts.css';
import { ReactTyped } from 'react-typed';

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
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <S.BubbleImg
                    src="/img/speech-bubble.png"
                    alt="speech bubble"
                    style={{ display: 'block' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '62%',
                        left: '45%',
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'Ownglyph_ryurue-Rg',
                        fontSize: '20px',
                        color: 'black',
                        textAlign: 'center',
                        width: '420px',
                        pointerEvents: 'none',
                    }}
                >
                    <ReactTyped
                        strings={[
                            '오늘 하루는 어떻게 보냈나요? 즐거운 일도 있었으면 좋겠어요!\n다음 강의도 함께 힘차게 해볼까요?',
                            '하루가 어떻게 지나갔나요? 작은 성취라도 있었다면 정말 멋진 거예요! 다음 강의도 함께 열심히 해보자구요!',
                            '다음 단계까지 조금만 더 힘내보아요! 우리 함께 웃으면서 즐겁게 준비할 수 있도록 해요. 파이팅!',
                            '최근에 도전한 것 중에 가장 기억에 남는 순간은 무엇인가요? 그 경험을 바탕으로 다음 강의도 함께 열심히 해봐요!',
                            '요즘 어떤 일이 가장 즐거우세요? 그 기분을 계속 이어가면서 다음 강의도 힘차게 해봅시다!',
                            '최근에 어떤 기분 좋은 일이 있었나요? 그 긍정적인 에너지를 계속 이어가면서 서로 응원해요!',
                        ]}
                        typeSpeed={120}
                        backSpeed={30}
                        loop
                    />
                </div>
            </div>
        </S.Container>
    );

    return MainView;
}

export default TeamMain;
