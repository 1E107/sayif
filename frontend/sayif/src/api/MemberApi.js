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

export const createMember = async formData => {
    try {
        return await axios.post(`${API_BASE_URL}/member/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
export const uploadProfileImage = async (token, newInfo, file) => {
    try {
        const formData = new FormData();

        // JSON 데이터를 Blob으로 변환하여 추가합니다.
        formData.append(
            'info',
            new Blob([JSON.stringify(newInfo)], { type: 'application/json' }),
        );

        // 파일을 추가합니다.
        if (file) {
            formData.append('file', file);
        }

        // 요청 헤더에 인증 토큰을 추가합니다.
        return await axios.put(`${API_BASE_URL}/member/member-info`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
            },
        });
    } catch (error) {
        // 에러를 발생시키거나 에러 처리를 수행합니다.
        console.error('이미지 및 정보 업로드 실패:', error);
        throw error; // 에러를 호출한 함수로 전달
    }
};
