// 소통 공간, 정보 공간 페이지에서 필요한 api가 정리되어 있습니다.

import axios from "axios";
import { API_BASE_URL } from "./config";

export const getSupportInfo = async (page, size, token) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/spt-info/${page}/${size}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response;
    }catch(error) {
        throw error;
    }
}