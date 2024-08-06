import axios from 'axios';
import { API_BASE_URL } from './config';

export const login = async (username, password) => {
    const loginData = {
        username: username,
        password: password,
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, loginData);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMemberInfo = async token => {
    try {
        const response = await axios.get(`${API_BASE_URL}/member/member-info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createMember = async data => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/member/register`,
            data,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateMember = async (token, data) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/member/member-info`,
            data,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const uploadProfileImage = async (token, userInfo, file) => {
    try {
        // FormData 객체를 생성합니다.
        const formData = new FormData();

        // 사용자 정보를 FormData에 추가합니다.
        Object.keys(userInfo).forEach(key => {
            formData.append(key, userInfo[key]);
        });

        // 파일을 FormData에 추가합니다.
        formData.append('file', file);

        // 요청 헤더에 인증 토큰을 추가합니다.
        const response = await axios.put(
            `${API_BASE_URL}/member/member-info`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
                },
            },
        );

        // 성공적인 응답을 반환합니다.
        return response;
    } catch (error) {
        // 에러를 발생시키거나 에러 처리를 수행합니다.
        console.error('이미지 및 정보 업로드 실패:', error);
        throw error; // 에러를 호출한 함수로 전달
    }
};
