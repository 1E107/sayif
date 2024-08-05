import { useNavigate } from 'react-router-dom';
import S from './style/ProofDcoumentsStyled'

function ProofDocuments() {
    const navigate = useNavigate();

    const handleSubmitBtn = () => {
        alert("파일 제출이 완료되었습니다.")
        navigate("/");
    }

    const ProofView = (
        <S.Container>
            <S.Text>
                자립 준비 청년임을 증명할 서류를 첨부해주세요! <br/>
                (.pdf .png .jpg)
            </S.Text>
            <div>
                <S.FileBtn variant="contained">파일 첨부</S.FileBtn>
                <S.FileBtn variant="contained">파일 삭제</S.FileBtn>
            </div>
            <S.SubmitBtn variant="contained" onClick={handleSubmitBtn}>제출하기</S.SubmitBtn>
        </S.Container>
    )
    return ProofView;
}

export default ProofDocuments;