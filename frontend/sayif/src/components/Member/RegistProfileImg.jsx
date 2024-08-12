import { useLocation, useNavigate } from 'react-router-dom';
import S from './style/RegistProfileImgStyled';
import { createMember } from '../../api/MemberApi';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function RegistProfileImg() {
    const fileInputRef = useRef(null);
    const location = useLocation();
    const info = location.state?.info;
    const formData = new FormData();
    const [selectImg, SetSelectImg] = useState('/default.jpg');
    const [profileImage, SetProfileImage] = useState(null);
    const navigate = useNavigate();

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleProfileImageChange = event => {
        const file = event.target.files[0];
        if (file) {
            SetProfileImage(file);
            const url = URL.createObjectURL(file);
            SetSelectImg(url);
        }
    };

    const infoBlob = new Blob([JSON.stringify(info)], {
        type: 'application/json',
    });

    formData.append('info', infoBlob);

    if (profileImage) {
        formData.append('file', profileImage);
    }

    const CallRegist = async () => {
        try {
            const response = await createMember(formData);
            if (response.status === 200) {
                navigate('/member/regist/proof-documents');
            }
        } catch (error) {
            alert('회원가입에 실패했습니다.');
            console.log(error);
        }
    };

    const ProfileImgView = (
        <S.Container>
            <S.TitleText>프로필 이미지를 선택해주세요.</S.TitleText>
            <S.ImgSelect
                src={selectImg}
                onClick={handleImageClick}
                alt="upload"
            ></S.ImgSelect>
            <S.ImgIcon>
                <AddAPhotoIcon style={{ fontSize: '100px' }} />
            </S.ImgIcon>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
            ></input>
            <S.ExplanText>
                프로필 사진을 등록하지 않으면 기본 이미지가 자동으로 설정됩니다!
            </S.ExplanText>
            <S.SubmitBtn variant="contained" onClick={CallRegist}>
                프로필 등록
            </S.SubmitBtn>
        </S.Container>
    );
    return ProfileImgView;
}

export default RegistProfileImg;
