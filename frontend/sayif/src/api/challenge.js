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

export const tryChallenge = async (challengeId, token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('challengeNum', challengeId);

    try {
        const response = await axios.post(
            `${API_BASE_URL}/challenge/predict`,
            formData,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const submitPhoto = async (challengeId, file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(
            `${API_BASE_URL}/challenge/${challengeId}`,
            formData,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMyImg = async (challengeId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/challenge/image/${challengeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getNowChallenge = async (teamId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/challenge/${teamId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const changeMissionStatus = async (challengeId, token) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/challenge/success/${challengeId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};
