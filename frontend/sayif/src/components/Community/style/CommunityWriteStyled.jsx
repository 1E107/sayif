import styled from 'styled-components';
import {
    MenuItem as MuiMenuItem,
    TextField as MuiTextField,
} from '@mui/material';

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
  gap: 20px; /* 자식 요소 간의 간격을 조절 */
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormControl = styled.div`
  width: 100%;
`;

export const CustomTextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    font-family: 'ChosunGu', sans-serif;
  }

  & .MuiInputLabel-root {
    font-family: 'ChosunGu', sans-serif;
  }
`;

export const CustomMenuItem = styled(MuiMenuItem)`
  font-family: 'ChosunGu', sans-serif;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 중앙에 배치 */
  margin-top: 20px;
`;

export const WriteButton = styled.button`
  font-family: 'ChosunGu', sans-serif;
  background-color: #116530;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  border: 1px solid #116530;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #0a3d22;
    border-color: #0a3d22;
  }

  &:disabled {
    background-color: #a1c4a1;
    border-color: #a1c4a1;
    cursor: not-allowed;
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트와 파일 선택 버튼을 세로로 배치 */
  align-items: center; /* 가운데 정렬 */
  width: 100%;
`;

export const FileInput = styled.input`
  display: none; /* 기본 파일 선택 버튼을 숨깁니다 */
`;

export const FileInputLabel = styled.label`
  font-family: 'ChosunGu', sans-serif;
  background-color: #116530;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  border: 1px solid #116530;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #0a3d22;
    border-color: #0a3d22;
  }
`;

export const FileUploadText = styled.span`
  margin: 10px 0; /* 파일 선택 버튼과 텍스트 사이의 간격 */
  font-family: 'ChosunGu', sans-serif;
  font-size: 16px;
  color: #333; /* 파일 업로드 텍스트 색상 */
`;

export const PreviewContainer = styled.fieldset`
  border: 1px solid #ddd; /* 테두리 스타일 설정 */
  border-radius: 10px;
  padding: 15px;
  width: 97%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  cursor: pointer; /* 커서를 포인터로 변경 */
  background-color: #fafafa; /* 배경색 추가 */
`;

export const Legend = styled.legend`
  font-family: 'ChosunGu', sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  cursor: pointer; /* 커서를 포인터로 변경 */
`;

export const PreviewImage = styled.img`
  max-width: 100%; /* 이미지의 최대 너비를 컨테이너에 맞춤 */
  max-height: 300px; /* 이미지의 최대 높이 설정 */
  object-fit: contain; /* 이미지 비율을 유지하면서 크기 조절 */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const UploadNotice = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px; /* 텍스트와 이미지 사이의 간격 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

export default {
    Container,
    Form,
    FormControl,
    CustomTextField,
    CustomMenuItem,
    ButtonContainer,
    WriteButton,
    FileInputContainer,
    FileInput,
    FileInputLabel,
    FileUploadText,
    PreviewContainer,
    Legend,
    PreviewImage,
    UploadNotice,
};
