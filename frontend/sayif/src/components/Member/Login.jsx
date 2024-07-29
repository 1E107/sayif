import { useDispatch } from 'react-redux';
import { setToken, setMember } from '../../redux/modules/member';
import S from './style/LoginStyled';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/MemberApi';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);

    const handleLogin = () => {
        const callLogin = async () => {
            try {
                const response = await login(loginId, loginPassword);
                const authToken = response.headers['access'];
                dispatch(setToken(authToken));
                alert('로그인에 성공하였습니다.');
                navigate('/');
            } catch (error) {
                console.log(error);
                setFailedLogin(true);
            }
        };
        callLogin();
    };

    const handleId = event => {
        setLoginId(event.target.value);
    };

    const handlePassword = event => {
        setLoginPassword(event.target.value);
    };

    const LoginView = (
        <S.Container style={{ height: failedLogin ? '350px' : '300px' }}>
            <S.Input placeholder="ID" onChange={handleId}></S.Input>
            <S.Input
                placeholder="Password"
                type="password"
                onChange={handlePassword}
            ></S.Input>
            <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
            <S.RegistButton>회원가입</S.RegistButton>
            {failedLogin && (
                <Alert severity="error" style={{ width: '380px' }}>
                    로그인에 실패했습니다.
                </Alert>
            )}
        </S.Container>
    );

    return LoginView;
}

export default Login;
