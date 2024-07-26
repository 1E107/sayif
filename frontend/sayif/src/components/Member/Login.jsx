import { useDispatch } from "react-redux";
import { TextField } from '@mui/material';
import { setToken, setMember } from "../../redux/modules/member";
import S from './style/LoginStyled';
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(setToken("dlatlxhzms"));
        navigate("/");
    }
  
    const LoginView = (
        <S.Container>
            <S.Input placeholder="ID"></S.Input>
            <S.Input placeholder="Password" type="password"></S.Input>
            <S.LoginButton  onClick={handleLogin}>로그인</S.LoginButton>
            <S.RegistButton>회원가입</S.RegistButton>
        </S.Container>
    );

    return LoginView;
}

export default Login;