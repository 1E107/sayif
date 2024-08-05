import axios from 'axios';
import { API_BASE_URL } from './config';

const username = 'OPENVIDUAPP';
const password = 'bangcutsoragodoongmeruohboksayif';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export const createSession = async (token, sessionId) => {
    try {
        console.log('OpenViduApi.js createSession ---');
        const response = await axios.post(
            `http://i11e107.p.ssafy.io/api/openvidu/api/sessions`,
            { customSessionId: sessionId },
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                    'X-Auth-Token': `Bearer ${token}`,
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

export const createConnection = async (token, sessionId) => {
    try {
        const response = await axios.post(
            `http://i11e107.p.ssafy.io/api/openvidu/api/sessions/${sessionId}/connection`,
            {},
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                    'X-Auth-Token': `Bearer ${token}`,
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

export const closeSession = async (token, sessionId) => {
    try {
        await axios.delete(
            `http://i11e107.p.ssafy.io/api/openvidu/api/sessions/${sessionId}`,
            {
                headers: {
                    Authorization: basicAuth,
                    'Content-Type': 'application/json',
                    'X-Auth-Token': `Bearer ${token}`,
                },
            },
        );
    } catch (error) {
        console.error('Error closing session:', error);
        throw error;
    }
};
