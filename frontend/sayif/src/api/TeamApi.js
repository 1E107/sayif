import axios from "axios";
import { API_BASE_URL } from "./config";

export const getChatData = async(token) => {
    
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