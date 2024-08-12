import { useNavigate } from 'react-router-dom';
import S from './style/ProofDcoumentsStyled';
import Swal from 'sweetalert2';

function ProofDocuments() {
    const navigate = useNavigate();

    const handleSubmitBtn = () => {
        Swal.fire({
            icon: 'success',
            title: '회원가입 완료',
            text: '회원가입이 완료되었습니다.',
            showConfirmButton: false,
            timer: 1500,
            confirmButtonColor: '#6c8e23',
        }).then(() => navigate('/'));
    };

    const ProofView = (
        <S.Container>
            <S.Text>
                자립 준비 청년임을 증명할 서류를 첨부해주세요! <br />
                (.pdf .png .jpg)
            </S.Text>
            <div>
                <S.FileBtn variant="contained">파일 첨부</S.FileBtn>
                <S.FileBtn variant="contained">파일 삭제</S.FileBtn>
            </div>
            <S.SubmitBtn variant="contained" onClick={handleSubmitBtn}>
                제출하기
            </S.SubmitBtn>
        </S.Container>
    );
    return ProofView;
}

export default ProofDocuments;
