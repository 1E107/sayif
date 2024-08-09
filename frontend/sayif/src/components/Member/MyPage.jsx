import { useDispatch, useSelector } from 'react-redux';
import S from './style/MyPageStyled';
import { useNavigate } from 'react-router-dom';
import {
    setExpirationdate,
    setMember,
    setToken,
} from '../../redux/modules/member';
import { useState } from 'react';
import MentoringModal from './MentoringModal';
import { getTeamStatue } from '../../api/MentoringApi';
import { getMemberInfo, uploadProfileImage, logout } from '../../api/MemberApi';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

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
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(member.profileImg);

    const ProfileImg = styled.img`
        width: 250px;
        height: 250px;
        border-radius: 150px;

        &:hover {
            ${({ changeInfo }) =>
                changeInfo &&
                `
            cursor: pointer;
            filter: brightness(0.3);
            transition: filter 0.3s ease;
        `}
        }

        &:hover + div {
            ${({ changeInfo }) =>
                changeInfo &&
                `
            transition: filter 0.3s ease;
            display: block;
        `}
        }
    `;

    const handleInputChange = field => e => {
        if (field === 'phone') {
            const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
            if (!phonePattern.test(e.target.value)) {
                SetPhoneError('하이픈(-)을 포함해 입력해 주세요.');
            } else {
                SetPhoneError('');
                SetNewMember(prevState => ({
                    ...prevState,
                    [field]: e.target.value,
                }));
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

    const handleLogout = () => {
        const callLogout = async () => {
            try {
                const response = await logout(token);
                if (response.status === 200) {
                    localStorage.removeItem('persist:root');
                    dispatch(setToken(null));
                    dispatch(setMember({}));
                    dispatch(setExpirationdate(null));
                    alert('로그아웃 되었습니다.');
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }
        };
        callLogout();
    };

    const handleCheckMessage = () => {
        navigate('/letter');
    };

    const handleCloseMentoringModal = () => {
        SetShowMentoringModal(false);
    };

    const handleOpenMentoringModal = () => {
        console.log(member);
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
            console.log(response.data);
            if (response.status === 200) {
                dispatch(setMember(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCallBtn = () => {
        const callUpdateInfo = async () => {
            const formData = new FormData();
            // JSON 객체를 문자열로 변환하여 Blob으로 추가
            const infoBlob = new Blob([JSON.stringify(newMember)], {
                type: 'application/json',
            });
            formData.append('info', infoBlob);
            // 파일 추가
            if (file !== null) {
                formData.append('file', file);
            }

            try {
                const response = await uploadProfileImage(token, formData);
                if (response.status === 200) {
                    await callMemberInfo();
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

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageClick = () => {
        if (changeInfo) {
            document.getElementById('fileInput').click();
        }
    };

    return (
        <S.Container>
            <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'center' }}>
                    <S.ImageContainer>
                        <ProfileImg
                            src={preview}
                            alt="Profile"
                            onClick={handleProfileImageClick}
                            changeInfo={changeInfo}
                        />
                        <S.ImgIcon>
                            <AddAPhotoIcon style={{ fontSize: '100px' }} />
                        </S.ImgIcon>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </S.ImageContainer>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <S.NickNameText>
                        {role === 'Mentor'
                            ? '단비'
                            : role === 'Mentee'
                              ? '새잎'
                              : ''}{' '}
                        / {member.nickname}
                    </S.NickNameText>
                    {/* <div>
                        <S.LetterBtn onClick={handleCheckMessage}>
                            쪽지함
                        </S.LetterBtn>
                    </div> */}
                    <S.ItemWrapper>
                        <Tooltip title="쪽지함">
                            <EmailIcon
                                style={{ fontSize: '40px', cursor: 'pointer' }}
                                onClick={handleCheckMessage}
                            />
                        </Tooltip>
                        <Tooltip title="로그아웃">
                            <LogoutIcon
                                style={{ fontSize: '40px', cursor: 'pointer' }}
                                onClick={handleLogout}
                            />
                        </Tooltip>
                    </S.ItemWrapper>
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
                            style={{
                                border: changeInfo
                                    ? '1px solid red'
                                    : '0px solid black',
                            }}
                        />
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
                            disabled={changeInfo}
                            onChange={handleGenderChange}
                            onKeyDown={handleKeyDown}
                        />
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
                            style={{
                                border: changeInfo
                                    ? '1px solid red'
                                    : '0px solid black',
                            }}
                        />
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
                            style={{
                                border: changeInfo
                                    ? '1px solid red'
                                    : '0px solid black',
                            }}
                        />
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
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    style={{
                        width: '800px',
                        marginTop: '30px',
                        fontFamily: 'ChosunGu',
                        fontSize: '17px',
                    }}
                >
                    변경하고 싶은 정보를 수정한 후, '변경사항 저장' 버튼을
                    눌러주세요!
                </Alert>
            )}
            {showMentoringModal && (
                <MentoringModal onClose={handleCloseMentoringModal} />
            )}
        </S.Container>
    );
}

export default MyPageComponent;
