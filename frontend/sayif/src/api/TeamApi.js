import axios from 'axios';
import { API_BASE_URL } from './config';

export const getChatData = async token => {
};

export const getMemberInfo = async (teamId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/${teamId}/member-info`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getQuizList = async (chapter, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/quiz/${chapter}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getStoryList = async (teamId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/${teamId}/story`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const postStory = async (teamId, token, content) => {
    const data = { content: content };
    try {
        const response = await axios.post(
            `${API_BASE_URL}/team/${teamId}/story`,
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

export const getReadStatus = async (teamId, contenetId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/${teamId}/story/${contenetId}`,
            { headers: { Authorization: `Bearer ${token}` } },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getQnAList = async (teamId, token, page, size) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/board/${teamId}/${page}/${size}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getQnADetail = async (boardId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/board/detail/${boardId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getQnAComment = async (boardId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/board/comment/${boardId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const postQnAComment = async (boardId, token, comment) => {
    const data = { content: comment };

    try {
        const response = await axios.post(
            `${API_BASE_URL}/team/board/comment/${boardId}`,
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

export const getMaterialList = async (teamId, token, page, size) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/material/${page}/${size}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMaterialDetail = async (materialId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/material/detail/${materialId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        console.log(response.data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getTeamExperience = async (teamId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/team/exp/${teamId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateTeamExperience = async (teamId, token, point) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/team/exp/${teamId}`,
            { point },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const CheckSolveQuiz = async (id, token) => {
    try {
        await axios.post(
            `${API_BASE_URL}/team/quiz/solve/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (error) {
        console.log(error);
    }
};

export const GetMySolve = async (id, token) => {
    try {
        const response = axios.get(`${API_BASE_URL}/team/quiz/solve/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const modifyTeamName = async (id, token, newName) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/team/${id}/team-name`,
            { newName },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getTeamName = async (id, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/team/${id}/team-name`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const postBoardWrite = async (teamId, token, postData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${API_BASE_URL}/team/board/${teamId}`,
        postData,
        config,
    );
    return response;
};
