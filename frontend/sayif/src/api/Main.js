// 소통 공간, 정보 공간 페이지에서 필요한 api가 정리되어 있습니다.

import axios from 'axios';
import { API_BASE_URL } from './config';

export const DeleteCommunityComment = async (id, token) => {
    try {
        return await axios.delete(`${API_BASE_URL}/comment/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
    } catch (err) {
        console.log(err);
    }
};

export const UpdateCommunityComment = async (id, content, token) => {
    try {
        const data = { content: content };
        return await axios.put(`${API_BASE_URL}/comment/${id}`,
            data,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
    } catch (err) {
        console.log(err);
    }
};

export const getSupportInfo = async (page, size, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/spt-info/${page}/${size}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDetailSupportInfo = async (id, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/spt-info/detail/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetCommunityList = async (token, type, page, size) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/board/${type}/${page}/${size}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetCommunityDetail = async (token, id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/board/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetCommunityComment = async (token, id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const PostCommunityComment = async (token, id, comment) => {
    const data = { content: comment };

    try {
        const response = await axios.post(
            `${API_BASE_URL}/comment/${id}`,
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
