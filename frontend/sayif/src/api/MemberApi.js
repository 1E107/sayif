import axios from 'axios';
import { API_BASE_URL } from './config';

export const login = async (username, password) => {
    const loginData = {
        username: username,
        password: password
    };

    try {        
        const response = await axios.post(`${API_BASE_URL}/login`, loginData);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const getMemberInfo = async(token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/member/member-info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch(error) {
        throw error;
    }
}

export const createMember = async(data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/member/register`, data);
        return response;
    }
    catch(error) {
        throw error;
    }
}