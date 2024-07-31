import { useNavigate } from 'react-router-dom';
import S from './style/CreateFinishStyled'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

function CreateFinish() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    const FinishView = (
        <S.Container>
            <DownloadDoneIcon style={{fontSize:"150PX", color:"#116530"}}></DownloadDoneIcon>
            <S.Title>멘토링 그룹 생성 완료</S.Title>
            <S.Content>
                <sapn style={{color: "#BA9C03"}}>하나</sapn>의 멘토링만 진행 가능합니다. <br/>
                멘토링은 시작일로부터 <sapn style={{color: "#BA9C03"}}>3일 전</sapn>에 신청 마감되며, 최소 인원 충족 시 진행됩니다.
            </S.Content>
            <S.CustomBtn variant="contained" onClick={handleClick}>확인</S.CustomBtn>
        </S.Container>
    );

    return FinishView;
}

export default CreateFinish;