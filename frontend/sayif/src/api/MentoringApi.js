import axios from 'axios';
import { API_BASE_URL } from './config';

export const getMentorList = async(page_no, size_no, start_date_from, start_date_to, pmam, time) => {
    const data = {
        start_date_from: start_date_from,
        start_date_to: start_date_to,
        pmam: pmam,
        time: time
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/mentoring/search/${page_no}/${size_no}`, data);
        return response;
    } catch(error) {
        throw error;
    }
}