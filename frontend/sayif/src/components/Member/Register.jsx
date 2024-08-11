import { useState } from 'react';
import S from './style/RegisterStyled';
import { useNavigate } from 'react-router-dom';
import { sendVerificationCode,verifyCode } from '../../api/sms';
import { useEffect } from 'react';

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
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(180); // 3분 타이머 설정 (180초)

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

    const handleSendVerificationCode = async () => {
        if (phone) {
            try {
                await sendVerificationCode(phone);
                setVerificationCodeSent(true);
                setTimeRemaining(180); // 타이머 시작
                alert('인증 코드가 발송되었습니다.');
            } catch (error) {
                console.error(error);
                alert('인증 코드 발송에 실패했습니다.');
            }
        } else {
            alert('휴대폰 번호를 입력해주세요.');
        }
    };

    const handleVerifyCode = async () => {
        if (inputCode) {
            try {
                const isValid = await verifyCode(phone, inputCode);
                if (isValid) {
                    setIsCodeVerified(true);
                    alert('인증이 확인되었습니다.');
                } else {
                    alert('인증 코드가 올바르지 않습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error(error);
                alert('인증 코드 검증에 실패했습니다.');
            }
        } else {
            alert('인증 코드를 입력해주세요.');
        }
    };

    useEffect(() => {
        if (verificationCodeSent && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0) {
            alert('인증 시간이 초과되었습니다. 다시 시도해주세요.');
            setVerificationCodeSent(false);
            setVerificationCode(''); // 기존 인증번호 만료
        }
    }, [verificationCodeSent, timeRemaining]);
    
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
                    placeholder="새잎"
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
                <S.Text >전화번호</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetPhone(e.target.value)}
                    onBlur={() => validatePhone(phone)}
                    helperText={phoneError}
                    error={!!phoneError}
                    placeholder="010-0000-0000"
                    style={{ width:'208px'}}
                />
                <S.CustomBtn
                    variant="outlined"
                    onClick={handleSendVerificationCode}
                    disabled={verificationCodeSent}
                    style={{width:'125px',fontSize:'15px',marginRight:'0px'}}
                >인증코드 발송</S.CustomBtn>
            </S.ItemWrapper>
            {verificationCodeSent && (
                <S.ItemWrapper>
                    <S.Text>인증코드</S.Text>
                    <S.CustomTextField
                        variant="outlined"
                        onChange={e => setInputCode(e.target.value)}
                        placeholder="인증코드 입력"
                        style={{ width:'208px'}}
                    />
                    <S.CustomBtn
                        variant="outlined"
                        onClick={handleVerifyCode}
                        disabled={isCodeVerified}
                        style={{width:'40px',fontSize:'15px'}}
                    >
                        확인
                    </S.CustomBtn>
                    {timeRemaining > 0 && (
                        <S.Text style={{ marginLeft: '10px', width:'55px', marginLeft:'0px', marginRight:'5px' }}>
                            {Math.floor(timeRemaining / 60)}분 {timeRemaining % 60}초 남음
                        </S.Text>
                    )}
                </S.ItemWrapper>
             )}
            <S.ItemWrapper>
                <S.Text>이메일</S.Text>
                <S.CustomTextField
                    variant="outlined"
                    onChange={e => SetEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    helperText={emailError}
                    error={!!emailError}
                    onBlur={() => validateEmail(email)}
                    placeholder="ssafy@ssafy.com"
                />
            </S.ItemWrapper>
            <S.RegistBtn 
                variant="contained" 
                onClick={handleNextButton}
                disabled={!isCodeVerified} // 인증이 완료되어야 버튼 활성화
            >
                다음
            </S.RegistBtn>
        </S.Container>
    );

    return RegisterView;
}

export default Register;
