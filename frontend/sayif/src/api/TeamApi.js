import axios from "axios";
import { API_BASE_URL } from "./config";

export const getChatData = async(token) => {
    
}

export const getMemberInfo = async(teamId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/team/${teamId}/member-info`, {
            headers: {Authorization: `Bearer ${token}`,}
        })
        return response;
    }catch(error) {
        throw error;
    }
}

export const getQuizList = async(chapter, token) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/team/quiz/${chapter}`, {
            headers: {Authorization: `Bearer ${token}`,}
        });
        return response;
    }catch(error) {
        throw error;
    }
}

export const getStoryList = async(teamId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/team/${teamId}/story`, {
            headers: {Authorization: `Bearer ${token}`,}
        });
        return response;
    }catch(error) {
        throw error;
    }
}

export const postStory = async(teamId, token, content) => {
    const data = {content : content};
    try{
        const response = await axios.post(`${API_BASE_URL}/team/${teamId}/story`, data, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response;
    }catch(error) {
        throw error;
    }
}