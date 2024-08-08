import axios from 'axios';
import { API_BASE_URL } from './config';

export const getList = async (token, page, size) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/member/message/${page}/${size}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getDetail = async (token, id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/member/message/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};
