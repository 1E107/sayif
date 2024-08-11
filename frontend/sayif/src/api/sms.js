import axios from 'axios';
import { API_BASE_URL } from './config';

// 인증 코드 전송 함수
export const sendVerificationCode = async (phoneNumber) => {
  try {
      const response = await axios.post(
          `${API_BASE_URL}/sms/send-verification-code`,
          { phoneNumber } // 요청 본문으로 phoneNumber를 보냅니다.
      );
      return response.data;
  } catch (error) {
      throw error;
  }
};

// 인증 코드 검증 함수
export const verifyCode = async (phoneNumber, code) => {
  try {
      const response = await axios.post(
          `${API_BASE_URL}/sms/verify-code`,
          { phoneNumber, code } // 요청 본문으로 phoneNumber와 code를 보냅니다.
      );
      return response.data;
  } catch (error) {
      throw error;
  }
};