import { useState } from 'react';
import S from './style/RegisterStyled';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [selectGender, SetSelectGender] = useState('');
    const [id, SetId] = useState('');
    const [password, SetPassword] = useState('');
    const [name, SetName] = useState('');
    const [nickname, SetNickname] = useState('');
    const [phone, SetPhone] = useState('');
    const [email, SetEmail] = useState('');
    const [phoneError, SetPhoneError] = useState('');
    const [emailError, SetEmailError] = useState('');
    const navigate = useNavigate();

    const handleClickGender = data => {
        SetSelectGender(data);
    };

    const gender = {
        여자: 'F',
        남자: 'M',
    };

    const validateEmail = email => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            SetEmailError('유효하지 않은 이메일 형식입니다.');
            return false;
        } else {
            SetEmailError('');
            return true;
        }
    };

    const validatePhone = phone => {
        const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
        if (!phonePattern.test(phone)) {
            SetPhoneError('하이픈(-)을 포함해 입력해 주세요.');
        } else {
            SetPhoneError('');
        }
    };

    const handleNextButton = () => {
        const info = {
            username: id,
            password: password,
            name: name,
            nickname: nickname,
            email: email,
            phone: phone,
            gender: gender[selectGender],
        };

        const isInfoValid = Object.values(info).every(
            value => value !== null && value !== '',
        );

        if (isInfoValid) {
            if (phoneError === '' && emailError === '') {
                navigate('/member/regist/profile-img', { state: { info } });
            } else {
                alert('입력한 정보가 올바른지 확인해 주세요!');
            }
        } else {
            alert('모든 정보를 올바르게 입력해주세요!');
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            if (validateEmail(email)) {
                handleNextButton();
            }
        }
    };

    const RegisterView = (
        <S.Container>
            <S.ItemWrapper>
                <S.Text>아이디</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetId(e.target.value)}
                />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>비밀번호</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    type="password"
                    onChange={e => SetPassword(e.target.value)}
                />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>이름</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetName(e.target.value)}
                    placeholder="홍길동"
                />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>닉네임</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetNickname(e.target.value)}
                    placeholder="홍길동"
                />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>성별</S.Text>
                <div style={{ width: '350px', textAlign: 'center' }}>
                    <S.CustomBtn
                        variant="outlined"
                        onClick={() => {
                            handleClickGender('남자');
                        }}
                        style={{
                            backgroundColor:
                                selectGender === '남자' ? '#BFEA7C' : 'white',
                        }}
                    >
                        남자
                    </S.CustomBtn>
                    <S.CustomBtn
                        variant="outlined"
                        onClick={() => {
                            handleClickGender('여자');
                        }}
                        style={{
                            backgroundColor:
                                selectGender === '여자' ? '#BFEA7C' : 'white',
                        }}
                    >
                        여자
                    </S.CustomBtn>
                </div>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>전화번호</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetPhone(e.target.value)}
                    onBlur={() => validatePhone(phone)}
                    helperText={phoneError}
                    error={!!phoneError}
                />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>이메일</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    helperText={emailError}
                    error={!!emailError}
                    onBlur={() => validateEmail(email)}
                />
            </S.ItemWrapper>
            <S.RegistBtn variant="contained" onClick={handleNextButton}>
                다음
            </S.RegistBtn>
        </S.Container>
    );

    return RegisterView;
}

export default Register;
