import { useState } from 'react';
import S from './style/MainStyled';
import { motion } from 'framer-motion';
import ChallengeCheckModal from './ChallengeCheckModal';

function ChallengeMain() {
    const [showModal, SetShowModal] = useState(false);

    const handleOpenCheck = () => {
        SetShowModal(true);
    };

    const handleCloseCheck = () => {
        SetShowModal(false);
    };

    const variants = {
        hidden: {
            opacity: 0.2,
            y: 15,
        },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
            },
        }),
    };

    const MainView = (
        <>
            <S.Container>
                <S.Title>CHALLENGE</S.Title>
                <S.ExplanText>
                    우리가 함께 진행할 미션이 무엇인지 알아봅시다! <br />
                </S.ExplanText>
                <S.MissionBox>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src="/img/sprout.png"
                            style={{ height: '100px' }}
                        />
                        <S.ContentText>
                            지금 진행 중인 챌린지가 궁금한가요? 아래 버튼을
                            눌러서 확인해보세요! <br /> 재미있는 일이 기다리고
                            있어요!
                        </S.ContentText>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            custom={0}
                        >
                            <S.CustomButton
                                variant="contained"
                                onClick={handleOpenCheck}
                            >
                                미션 확인하기
                            </S.CustomButton>
                        </motion.div>
                    </div>
                </S.MissionBox>
            </S.Container>
            {showModal && (
                <ChallengeCheckModal
                    showModal={showModal}
                    onClose={handleCloseCheck}
                />
            )}
        </>
    );

    return MainView;
}

export default ChallengeMain;
