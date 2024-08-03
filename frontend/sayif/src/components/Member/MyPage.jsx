import { useDispatch, useSelector } from 'react-redux';
import S from './style/MyPageStyled'
import { useNavigate } from 'react-router-dom';
import { setExpirationdate, setMember, setToken } from '../../redux/modules/member';
import useTokenExpiration from '../../hooks/useTokenExpiration';
import { useEffect } from 'react';

function MyPageComponent() {
    const navigate = useNavigate();
    const {token, member} = useSelector(state => state.member);
    const role = member.role;
    const gender = member.gender;
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('persist:root');
        dispatch(setToken(null));
        dispatch(setMember({}));
        dispatch(setExpirationdate(null));
        alert("로그아웃 되었습니다.")
        navigate('/');
    }

    const MyPageView = (
        <S.Container>
            <div style={{display: "flex"}}>
                <div style={{textAlign: "center"}}>
                    <S.ProfileImg src="/basic-profile.png"/>
                    <S.NickNameText>
                        { role === 'Mentor' ? '단비' : role === 'Mentee' ? '새잎' : ''} / {member.nickname}
                    </S.NickNameText>
                    <S.LogoutBtn onClick={logout}>로그아웃</S.LogoutBtn>
                </div>
                <div style={{marginLeft: "80px"}}>
                    <div style={{display: "flex", alignItems: "center", marginTop:"30px"}}>
                            <S.TitleText>이름</S.TitleText>
                            <S.CustomInput value={member.name}></S.CustomInput>
                    </div>
                    <div style={{display: "flex", alignItems: "center", marginTop:"30px"}}>
                            <S.TitleText>성별</S.TitleText>
                            <S.CustomInput value={ gender === 'F' ? '여성' : gender === 'M' ? '남성' : ''}></S.CustomInput>
                    </div>
                    <div style={{display: "flex", alignItems: "center", marginTop:"30px"}}>
                            <S.TitleText>전화번호</S.TitleText>
                            <S.CustomInput  value={member.phone}></S.CustomInput>
                    </div>
                    <div style={{display: "flex", alignItems: "center", marginTop:"30px"}}>
                            <S.TitleText>이메일</S.TitleText>
                            <S.CustomInput value={member.email}></S.CustomInput>
                    </div>
                </div>
            </div>
        
            <div>
                <S.ProfileUpdateBtn>프로필 수정</S.ProfileUpdateBtn>
                <S.ProfileUpdateBtn>멘토링 신청 현황</S.ProfileUpdateBtn>
            </div>
        </S.Container>
    ) 
    return MyPageView;
}

export default MyPageComponent;