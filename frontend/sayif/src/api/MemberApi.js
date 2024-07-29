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