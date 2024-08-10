import styled from 'styled-components';
import Button from '@mui/material/Button';
import '../../../styles/fonts.css';

const Container = styled.div`
    margin-top:200px;
    width: 1000px;
    height: 800px;
    border-radius: 40px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const NickNameText = styled.div`
    margin-top: 30px;
    font-size: 25px;
    font-family: ChosunGu;
    color: #e8e8cc;
    background-color: #116530;
    padding: 10px;
    border-radius: 30px;
`;

const ImgIcon = styled.div`
    position: absolute;
    color: white;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TitleText = styled.div`
    font-family: ChosunGu;
    color: #116530;
    font-weight: bold;
    font-size: 18px;
    width: 100px;
`;

const CustomInput = styled.input`
    height: 40px;
    width: 300px;
    border-radius: 10px;
    border: 0px solid;
    background-color: #e8e8ccb2;
    padding: 5px 0px 5px 10px;
    font-family: ChosunGu;

    &::placeholder {
        color: black;
    }
`;

const UpdateText = styled.div`
    margin-top: 30px;
    font-family: ChosunGu;
    font-size: 13px;
`;

const ErrorMsg = styled.div`
    font-size: 13px;
    margin-top: 10px;
    font-family: ChosunGu;
    color: red;
    margin-left: 100px;
`;

const ProfileUpdateBtn = styled(Button)({
    fontFamily: 'ChosunGu !important',
    color: '#E8E8CC !important',
    backgroundColor: '#116530 !important',
    margin: '50px 10px 0px 10px !important',
    width: '170px',
    fontSize: '18px !important',
});

const LogoutBtn = styled(Button)({
    marginTop: '10px !important',
    fontFamily: 'ChosunGu !important',
});

const TagContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TagInput = styled(CustomInput)`
    width: 250px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 16px;
`;

const AddTagButton = styled(Button)({
    fontFamily: 'ChosunGu !important',
    color: '#E8E8CC !important',
    backgroundColor: '#116530 !important',
    fontSize: '16px !important',
    height: '50px',
});

const TagList = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f9f9f9;
    min-height: 100px;
`;

const TagItem = styled.div`
    background-color: #ddd;
    padding: 8px 15px;
    margin: 5px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    font-family: ChosunGu;
    font-size: 16px;
    background-color: #e8e8ccb2;
    color: #116530;
    height:13px;
`;

const DeleteTagButton = styled.button`
    margin-left: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    padding: 0;

    &:hover {
        background-color: #d32f2f;
    }
`;

const S = {
    Container,
    TitleText,
    CustomInput,
    NickNameText,
    ProfileUpdateBtn,
    LogoutBtn,
    UpdateText,
    ErrorMsg,
    ImgIcon,
    ImageContainer,
    TagContainer,
    TagInput,
    AddTagButton,
    TagList,
    TagItem,
    DeleteTagButton,
};

export default S;
