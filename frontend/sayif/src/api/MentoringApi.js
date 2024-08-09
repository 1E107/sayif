import axios from 'axios';
import { API_BASE_URL } from './config';

export const getMentorList = async (
    page_no,
    size_no,
    start_date_from,
    start_date_to,
    pmam,
    time,
) => {
    const data = {
        start_date_from: start_date_from,
        start_date_to: start_date_to,
        pmam: pmam,
        time: time,
    };

    try {
        return await axios.post(
            `${API_BASE_URL}/mentoring/search/${page_no}/${size_no}`,
            data,
        );
    } catch (error) {
        throw error;
    }
};

export const applyMentoring = async (id, token) => {
    const data = { id: id };

    try {
        return await axios.post(`${API_BASE_URL}/mentoring/application`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const getTeamStatue = async (id, token) => {
    try {
        return await axios.get(`${API_BASE_URL}/mentoring/team/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const submitMentoringGroup = async (
    start_date,
    day_of_week,
    time,
    pmam,
    id,
    token,
) => {
    const data = {
        start_date: start_date,
        day_of_week: day_of_week,
        time: time,
        pmam: pmam,
        id: id,
    };
    console.log(data);

    try {
        return await axios.post(`${API_BASE_URL}/mentoring/recruit`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const getTeamSessionId = async (id, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/mentoring/session/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data; // response 객체의 data 부분만 반환
    } catch (error) {
        // 에러 메시지를 좀 더 명확하게 출력
        console.error(
            'Error fetching session ID:',
            error.response ? error.response.data : error.message,
        );
        throw error;
    }
};

export const getTotalMentor = async token => {
    try {
        return await axios.get(`${API_BASE_URL}/mentoring/mentor-nickname`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error;
    }
};
