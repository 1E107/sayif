import { useState } from 'react';
import S from './style/RegisterStyled'
import { createMember } from '../../api/MemberApi';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [selectGender, SetSelectGender] = useState("");
    const [id, SetId] = useState("");
    const [password, SetPassword] = useState("");
    const [name, SetName] = useState("");
    const [nickname, SetNickname] = useState("");
    const [phone, SetPhone] = useState("");
    const [email, SetEmail] = useState("");
    const navigate = useNavigate();

    const handleClickGender = (data) => {
        SetSelectGender(data);
    }

    const gender = {
        "여자" : "F",
        "남자" : "M",
    }

    const handleNextButton = () => {
        const data = {
            username: id,
            password: password,
            name: name,
            nickname: nickname,
            phone: phone,
            email: email,
            gender: gender[selectGender]
        }

        const CallRegist = async () => {
            try {
                const response = await createMember(data);
                if(response.status === 200) {
                    navigate("/member/regist/proof-documents");
                }
            }catch(error) {
                alert("회원가입에 실패했습니다.");
                console.log(error);
            }
        }
        CallRegist();
    }

    const RegisterView = (
        <S.Container>
            <S.ItemWrapper>
                <S.Text>아이디</S.Text>
                <S.CustomTextField  variant="outlined" onChange={(e) => SetId(e.target.value)}/>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>비밀번호</S.Text>
                <S.CustomTextField  variant="outlined" type='password' onChange={(e) => SetPassword(e.target.value)}/>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>이름</S.Text>
                <S.CustomTextField  variant="outlined" onChange={(e) => SetName(e.target.value)}/>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>닉네임</S.Text>
                <S.CustomTextField  variant="outlined" onChange={(e) => SetNickname(e.target.value)}/>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>성별</S.Text>
                <div style={{width:"350px", textAlign: "center"}}>
                    <S.CustomBtn 
                        variant="outlined" 
                        onClick={() => {handleClickGender("남자")}} 
                        style={{backgroundColor: selectGender === "남자" ? '#BFEA7C' : 'white'}}
                    >남자</S.CustomBtn>
                    <S.CustomBtn 
                        variant="outlined" 
                        onClick={() => {handleClickGender("여자")}}
                        style={{backgroundColor: selectGender === "여자" ? '#BFEA7C' : 'white'}}
                    >여자</S.CustomBtn>
                </div>
               
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>전화번호</S.Text>
                <S.CustomTextField  variant="outlined" onChange={(e) => SetPhone(e.target.value)} />
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.Text>이메일</S.Text>
                <S.CustomTextField  variant="outlined" onChange={(e) => SetEmail(e.target.value)}/>
            </S.ItemWrapper>

            <S.RegistBtn variant="contained" onClick={handleNextButton}>다음</S.RegistBtn>
        </S.Container>
    );

    return RegisterView;
}

export default Register;