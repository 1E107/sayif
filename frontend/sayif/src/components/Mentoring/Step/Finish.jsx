import S from './style/FinishStyled';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SelectMentor() {
    const navigate = useNavigate();

    const handleGoMain = () => {
        navigate('/');
    };

    const SelectMentorView = (
        <S.Container>
            <S.Icon />
            <S.ShowTextWrapper>
                <DownloadDoneIcon
                    style={{ fontSize: '150PX', color: '#116530' }}
                ></DownloadDoneIcon>
                <S.MainTitle>멘토링 신청 완료</S.MainTitle>
                <S.SubText>
                    멘토링은 시작일로부터{' '}
                    <span style={{ color: '#BA9C03' }}>3일 전</span>에 신청
                    마감되며, 최소 인원 충족 시 진행됩니다.
                    <br />
                    <span style={{ color: '#BA9C03' }}>하나</span>의 멘토링만
                    신청 및 진행 가능합니다. <br />
                    <S.SubTextHigh>마이페이지 - 멘토링 신청 조회</S.SubTextHigh>
                    에서 신청{' '}
                    <span style={{ color: '#BA9C03' }}>변경 / 취소</span>{' '}
                    가능합니다. <br />
                </S.SubText>
                <Button
                    variant="contained"
                    onClick={handleGoMain}
                    style={{
                        fontFamily: 'ChosunGu',
                        backgroundColor: '#116530',
                        width: '250px',
                        height: '50px',
                    }}
                >
                    확인
                </Button>
            </S.ShowTextWrapper>
        </S.Container>
    );

    return SelectMentorView;
}

export default SelectMentor;
