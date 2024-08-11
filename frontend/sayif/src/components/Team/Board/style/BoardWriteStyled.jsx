import styled from 'styled-components';
import { TextField as MuiTextField } from '@mui/material';

// 스타일 컴포넌트 정의
export const Container = styled.div`
    font-family: 'ChosunGu', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    margin: 40px auto;
    width: 90%;
    max-width: 900px;
    min-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleInput = styled(MuiTextField)`
    & .MuiInputBase-root {
        font-family: 'ChosunGu', sans-serif;
    }

    & .MuiInputLabel-root {
        font-family: 'ChosunGu', sans-serif;
    }
`;

export const ContentTextArea = styled(MuiTextField).attrs({
    multiline: true,
    rows: 10,
})`
    & .MuiInputBase-root {
        font-family: 'ChosunGu', sans-serif;
    }

    & .MuiInputLabel-root {
        font-family: 'ChosunGu', sans-serif;
    }
`;

export const SubmitButton = styled.button`
    font-family: 'ChosunGu', sans-serif;
    background-color: #116530;
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    border: 1px solid #116530;
    transition:
        background-color 0.3s,
        border-color 0.3s;

    &:hover {
        background-color: #0a3d22;
        border-color: #0a3d22;
    }
`;

export const CancelButton = styled.button`
    font-family: 'ChosunGu', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    border: 1px solid #ddd;
    transition:
        background-color 0.3s,
        border-color 0.3s;

    &:hover {
        background-color: #ddd;
    }
`;

export default {
    Container,
    Form,
    TitleInput,
    ContentTextArea,
    SubmitButton,
    CancelButton,
};

