import axios from 'axios';
import { API_BASE_URL } from './config';

const username = 'OPENVIDUAPP';
const password = 'bangcutsoragodoongmeruohboksayif';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export const createSession = async (sessionId) => {
    try {
        console.log('OpenViduApi.js createSession ---');
        const response = await axios.post(
            `${API_BASE_URL}/openvidu/api/sessions`,
            {customSessionId: sessionId},
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export const createConnection = async sessionId => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/openvidu/api/sessions/${sessionId}/connection`,
            {},
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating connection:', error);
        throw error;
    }
};

export const closeSession = async sessionId => {
    try {
        await axios.delete(
            `${API_BASE_URL}/openvidu/api/sessions/${sessionId}`,
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                },
            },
        );
    } catch (error) {
        console.error('Error closing session:', error);
        throw error;
    }
};
