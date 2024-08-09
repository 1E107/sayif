import axios from 'axios';
import { API_BASE_URL } from './config';

export const login = async (username, password) => {
    const loginData = {
        username: username,
        password: password,
    };

    try {
        return await axios.post(`${API_BASE_URL}/login`, loginData, {
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logout = async token => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMemberInfo = async token => {
    try {
        return await axios.get(`${API_BASE_URL}/member/member-info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
        return await axios.put(`${API_BASE_URL}/member/member-info`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error;
    }
};

export const uploadProfileImage = async (token, formData) => {
    try {
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

export const getNewToken = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reissue`, null, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        throw error;
    }
};
