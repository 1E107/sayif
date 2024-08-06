import { useDispatch, useSelector } from 'react-redux';
import S from './style/MyPageStyled';
import { useNavigate } from 'react-router-dom';
import {
    setExpirationdate,
    setMember,
    setToken,
} from '../../redux/modules/member';
import { useEffect, useState } from 'react';
import MentoringModal from './MentoringModal';
import { getTeamStatue } from '../../api/MentoringApi';
import { updateMember, getMemberInfo } from '../../api/MemberApi';

function MyPageComponent() {
    const navigate = useNavigate();
    const { token, member } = useSelector(state => state.member);
    const role = member.role;
    const gender = member.gender;
    const dispatch = useDispatch();
    const [changeInfo, SetChangeInfo] = useState(false);
    const [showMentoringModal, SetShowMentoringModal] = useState(false);
    const [phoneError, SetPhoneError] = useState('');
    const [emailError, SetEmailError] = useState('');
    const [newMember, SetNewMember] = useState({
        name: member.name,
        phone: member.phone,
        email: member.email,
        gender: member.gender,
    });

    const handleInputChange = field => e => {
        console.log(field);
        if (field === 'phone') {
            const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
            if (!phonePattern.test(e.target.value)) {
                SetPhoneError('유효하지 않은 전화번호 형식입니다.');
            } else {
                SetPhoneError('');
                SetNewMember({ ...newMember, [field]: e.target.value });
            }
        } else if (field === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(e.target.value)) {
                SetEmailError('유효하지 않은 이메일 형식입니다.');
            } else {
                SetEmailError('');
                SetNewMember({ ...newMember, [field]: e.target.value });
            }
        } else {
            SetNewMember({ ...newMember, [field]: e.target.value });
        }
    };

    const logout = () => {
        localStorage.removeItem('persist:root');
        dispatch(setToken(null));
        dispatch(setMember({}));
        dispatch(setExpirationdate(null));
        alert('로그아웃 되었습니다.');
        navigate('/');
    };

    const handleCloseMentoringModal = () => {
        SetShowMentoringModal(false);
    };

    const handleOpenMentoringModal = () => {
        const CallMentoringStatue = async () => {
            try {
                const response = await getTeamStatue(member.teamId, token);
                if (response.status === 200) {
                    if (response.data.status === 'Apply') {
                        SetShowMentoringModal(true);
                    } else {
                        alert(
                            '신청한 멘토링이 없거나 현재 멘토링이 진행 중이에요!',
                        );
                    }
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        CallMentoringStatue();
    };

    const handleUpdateBtn = () => {
        SetChangeInfo(true);
    };

    const callMemberInfo = async () => {
        try {
            const response = await getMemberInfo(token);
            if (response.status === 200) {
                console.log(response.data);
                dispatch(setMember(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCallBtn = () => {
        const callUpdateInfo = async () => {
            try {
                const response = await updateMember(token, newMember);
                if (response.status === 200) {
                    callMemberInfo();
                    alert('회원 정보가 성공적으로 수정되었어요!');
                    window.location.reload();
                }
            } catch (error) {
                alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요!');
                console.log(error);
            }
        };

        if (phoneError === '' && emailError === '') {
            callUpdateInfo();
        } else {
            alert('입력한 정보가 올바른지 확인해 주세요!');
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleUpdateCallBtn();
        }
    };

    const handleGenderChange = e => {
        SetNewMember({
            ...newMember,
            gender: e.target.value === '여성' ? 'F' : 'M',
        });
    };

    const MyPageView = (
        <S.Container>
            <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'center' }}>
                    <S.ProfileImg src="/basic-profile.png" />
                    <S.NickNameText>
                        {role === 'Mentor'
                            ? '단비'
                            : role === 'Mentee'
                              ? '새잎'
                              : ''}{' '}
                        / {member.nickname}
                    </S.NickNameText>
                    <S.LogoutBtn onClick={logout}>로그아웃</S.LogoutBtn>
                </div>
                <div style={{ marginLeft: '80px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                        }}
                    >
                        <S.TitleText>이름</S.TitleText>
                        <S.CustomInput
                            placeholder={member.name}
                            disabled={!changeInfo}
                            onChange={handleInputChange('name')}
                            onKeyDown={handleKeyDown}
                        ></S.CustomInput>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                        }}
                    >
                        <S.TitleText>성별</S.TitleText>
                        <S.CustomInput
                            placeholder={
                                gender === 'F'
                                    ? '여성'
                                    : gender === 'M'
                                      ? '남성'
                                      : ''
                            }
                            onChange={handleGenderChange}
                            onKeyDown={handleKeyDown}
                            disabled={!changeInfo}
                        ></S.CustomInput>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                        }}
                    >
                        <S.TitleText>전화번호</S.TitleText>
                        <S.CustomInput
                            placeholder={member.phone}
                            disabled={!changeInfo}
                            onChange={handleInputChange('phone')}
                            onKeyDown={handleKeyDown}
                        ></S.CustomInput>
                    </div>
                    {phoneError && <S.ErrorMsg>{phoneError}</S.ErrorMsg>}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                        }}
                    >
                        <S.TitleText>이메일</S.TitleText>
                        <S.CustomInput
                            placeholder={member.email}
                            disabled={!changeInfo}
                            onChange={handleInputChange('email')}
                            onKeyDown={handleKeyDown}
                        ></S.CustomInput>
                    </div>
                    {emailError && <S.ErrorMsg>{emailError}</S.ErrorMsg>}
                </div>
            </div>

            <div>
                {!changeInfo && (
                    <S.ProfileUpdateBtn onClick={handleUpdateBtn}>
                        프로필 수정
                    </S.ProfileUpdateBtn>
                )}
                {changeInfo && (
                    <S.ProfileUpdateBtn onClick={handleUpdateCallBtn}>
                        변경사항 저장
                    </S.ProfileUpdateBtn>
                )}
                <S.ProfileUpdateBtn onClick={handleOpenMentoringModal}>
                    멘토링 신청 현황
                </S.ProfileUpdateBtn>
            </div>
            {changeInfo && (
                <S.UpdateText>
                    변경하고 싶은 정보를 수정한 후, '변경사항 저장' 버튼을
                    눌러주세요 😊
                </S.UpdateText>
            )}
            {showMentoringModal && (
                <MentoringModal onClose={handleCloseMentoringModal} />
            )}
        </S.Container>
    );
    return MyPageView;
}

export default MyPageComponent;
