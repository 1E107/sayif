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
import {
    addTags,
    deleteTag,
    getMemberInfo,
    getMentorProfile,
    getTagsForMember,
    logout,
    updateMentorProfile,
    uploadProfileImage,
} from '../../api/MemberApi';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';

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
        nickname: member.nickname,
        phone: member.phone,
        email: member.email,
        gender: member.gender,
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(member.profileImg);
    const [tags, setTags] = useState([]); // 현재 태그들을 저장하는 상태
    const [newTag, setNewTag] = useState(''); // 새로 추가할 태그
    const [deletedTags, setDeletedTags] = useState([]);
    const [existingTagIds, setExistingTagIds] = useState([]);
    const [intro, setIntro] = useState(''); // Intro 상태 변수 추가

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
                    Swal.fire({
                        icon: 'success',
                        title: '로그아웃 되었습니다.',
                        confirmButtonColor: '#6c8e23',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(navigate('/'));
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
                        Swal.fire({
                            icon: 'info',
                            title: '멘토링 신청 현황',
                            text: '신청한 멘토링이 없거나 현재 멘토링이 진행 중입니다.',
                            confirmButtonText: '확인',
                            confirmButtonColor: '#6c8e23',
                        });
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
            // 태그 추가
            const tagData = new FormData();
            tagData.append('contents', tags);

            // 파일 추가
            if (file !== null) {
                formData.append('file', file);
            }

            try {
                const response = await uploadProfileImage(token, formData);
                if (response.status === 200) {
                    const newTags = tags.filter(
                        tag => !existingTagIds.includes(tag.id),
                    );
                    if (newTags.length > 0) {
                        await addTags(token, {
                            contents: newTags.map(tag => tag.content),
                        });
                    }

                    // 태그 삭제
                    if (deletedTags.length > 0) {
                        for (let tagId of deletedTags) {
                            await deleteTag(token, { tagId });
                        }
                    }
                    // 멘토 Intro 수정
                    if (member.role === 'Mentor' && intro) {
                        const profileUpdateData = { intro }; // intro만 포함된 객체
                        await updateMentorProfile(token, profileUpdateData);
                    }
                    await callMemberInfo();
                    await Swal.fire({
                        icon: 'success',
                        title: '회원 정보가 수정되었습니다!',
                        showConfirmButton: false,
                        confirmButtonColor: '#6c8e23',
                        timer: 1500,
                    }).then(() => window.location.reload());
                    window.location.reload();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: '회원 정보 수정 실패',
                    text: '다시 시도해 주세요!',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
                console.log(error);
            }
        };

        if (phoneError === '' && emailError === '') {
            callUpdateInfo();
        } else {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '입력한 정보가 올바른지 확인해 주세요!',
                confirmButtonText: '확인',
                confirmButtonColor: '#6c8e23',
            });
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

    useEffect(() => {
        if (member.role === 'Mentor') {
            // member.role이 Mentor인 경우에만 실행
            const fetchTagsAndIntro = async () => {
                try {
                    const tagResponse = await getTagsForMember(token);
                    const mentorResponse = await getMentorProfile(token);
                    console.log(mentorResponse);
                    if (tagResponse.status === 200) {
                        console.log(tagResponse.data);
                        const fetchedTags = tagResponse.data.map(tag => ({
                            id: tag.id,
                            content: tag.content,
                        }));
                        setTags(fetchedTags);
                        console.log(fetchedTags);
                        setExistingTagIds(fetchedTags.map(tag => tag.id)); // 기존 태그의 ID를 저장
                    }
                    console.log(mentorResponse.status);
                    setIntro(mentorResponse.intro); // Intro 설정
                } catch (error) {
                    console.log(error);
                }
            };
            fetchTagsAndIntro();
        }
    }, [member.role, token]);

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
            const isDuplicate = tags.some(tag => tag.content === newTag.trim());
            if (tags.length >= 5) {
                Swal.fire({
                    icon: 'warning',
                    title: '태그 추가 오류',
                    text: '태그는 최대 5개까지 추가할 수 있습니다.',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
                return;
            }
            if (isDuplicate) {
                Swal.fire({
                    icon: 'warning',
                    title: '태그 추가 오류',
                    text: '중복된 태그를 추가할 수 없습니다.',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
                return;
            }
            setTags([
                ...tags,
                {
                    id: new Date().getTime(),
                    content: newTag.trim(),
                },
            ]);
            setNewTag('');
        } else {
            Swal.fire({
                icon: 'warning',
                title: '태그 추가 오류',
                text: '태그를 입력해 주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#6c8e23',
            });
        }
    };

    const handleDeleteTag = tagToDeleteId => {
        setTags(tags.filter(tag => tag.id !== tagToDeleteId));
        setDeletedTags([...deletedTags, tagToDeleteId]);
    };

    return (
        <S.Spacer changeInfo={changeInfo} role={member.role}>
            <S.Container changeInfo={changeInfo} role={member.role}>
                <div style={{ display: 'flex', marginTop: '50px' }}>
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
                                    style={{
                                        fontSize: '40px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleCheckMessage}
                                />
                            </Tooltip>
                            <Tooltip title="로그아웃">
                                <LogoutIcon
                                    style={{
                                        fontSize: '40px',
                                        cursor: 'pointer',
                                    }}
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
                                marginTop: '10px',
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
                            <S.TitleText>닉네임</S.TitleText>
                            <S.CustomInput
                                placeholder={member.nickname}
                                disabled={!changeInfo}
                                onChange={handleInputChange('nickname')}
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
                {member.role === 'Mentor' && (
                    <S.TagAndIntroContainer>
                        <S.TagSection>
                            <S.TitleText>태그</S.TitleText>
                            {changeInfo && ( // changeInfo가 true일 때만 렌더링
                                <S.TagContainer>
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginBottom: '10px',
                                            width: '100%',
                                        }}
                                    >
                                        <S.TagInput
                                            type="text"
                                            value={newTag}
                                            onChange={e =>
                                                setNewTag(e.target.value)
                                            }
                                            onKeyDown={e => {
                                                if (
                                                    e.key === 'Enter' &&
                                                    newTag.trim() !== ''
                                                ) {
                                                    // 엔터 키와 빈 문자열 체크
                                                    e.preventDefault(); // 폼 제출 방지
                                                    // 태그를 추가하는 로직
                                                    setTags(prevTags => [
                                                        ...prevTags,
                                                        {
                                                            id: Date.now(),
                                                            content:
                                                                newTag.trim(),
                                                        },
                                                    ]);
                                                    setNewTag(''); // 입력창 비우기
                                                }
                                            }}
                                            placeholder="태그 입력"
                                            disabled={!changeInfo} // 비활성화 여부 설정
                                            style={{
                                                border: changeInfo
                                                    ? '1px solid red' // 수정 모드일 때 빨간 테두리
                                                    : '0px solid black', // 기본 상태일 때 테두리 없음
                                            }}
                                        />
                                        <S.AddTagButton onClick={handleAddTag}>
                                            추가
                                        </S.AddTagButton>
                                    </div>
                                </S.TagContainer>
                            )}
                            <S.TextArea
                                style={{
                                    width: '340px',
                                    marginTop: !changeInfo ? '20px' : '0px',
                                }}
                            >
                                {tags.map(tag => (
                                    <S.TagItem key={tag.id}>
                                        {tag.content}
                                        {changeInfo && ( // changeInfo가 true일 때만 삭제 버튼 렌더링
                                            <S.DeleteTagButton
                                                onClick={() =>
                                                    handleDeleteTag(tag.id)
                                                }
                                                style={{
                                                    border: '1px solid red', // 여기에 스타일 추가
                                                }}
                                            >
                                                X
                                            </S.DeleteTagButton>
                                        )}
                                    </S.TagItem>
                                ))}
                            </S.TextArea>
                        </S.TagSection>

                        <S.IntroSection>
                            <S.TitleText style={{ marginBottom: '20px' }}>
                                멘토 인사말
                            </S.TitleText>
                            <S.IntroTextArea
                                as="textarea" // textarea로 렌더링되도록 변경
                                value={intro} // textarea의 value로 intro 상태를 설정
                                onChange={e => setIntro(e.target.value)} // textarea의 값이 변경될 때 intro 상태를 업데이트
                                disabled={!changeInfo} // changeInfo가 true일 때만 편집 가능
                                style={{
                                    border: changeInfo
                                        ? '1px solid red' // 수정 모드일 때 빨간 테두리
                                        : '0px solid black', // 기본 상태일 때 테두리 없음
                                    width: '340px', // 너비 설정
                                    height: '100px', // 높이 설정
                                    resize: 'none', // 사용자가 크기를 조정할 수 없게 설정
                                    padding: '10px', // 패딩 추가
                                    borderRadius: '10px', // 모서리 둥글게
                                    backgroundColor: '#f9f9f9', // 배경색 설정
                                    fontFamily: 'ChosunGu',
                                    color: '#116530',
                                    fontSize: '16px',
                                    wordWrap: 'break-word', // 줄 바꿈 처리
                                    whiteSpace: 'pre-wrap', // 개행 문자 유지
                                }}
                            >
                                {intro}
                            </S.IntroTextArea>
                        </S.IntroSection>
                    </S.TagAndIntroContainer>
                )}
                <div style={{ height: '25px' }}>
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
                            marginTop: '60px',
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
        </S.Spacer>
    );
}

export default MyPageComponent;
