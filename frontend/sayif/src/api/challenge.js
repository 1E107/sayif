import axios from 'axios';
import { API_BASE_URL } from './config';

export const getNextMission = async (teamId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/challenge/try/${teamId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getDetailChallenge = async (challengeId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/challenge/detail/${challengeId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};
