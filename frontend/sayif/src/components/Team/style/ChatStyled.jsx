import styled from 'styled-components';
import '../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 100px;
    margin-bottom: 30px;
    background-color: white;
    height: 80vh;  // 화면의 80% 높이로 조정
    width: 760px;  // 가로 폭은 그대로 유지
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


    @media (max-width: 800px) {
        width: 510px;
        padding: 0 10px;
        height: 70vh; // 화면의 70% 높이로 조정
    }
    @media (max-width: 640px) {
        width: 380px;
        padding: 0 10px;
        margin-bottom: 60px;
        height: 60vh; // 화면의 60% 높이로 조정
    }
`;

const TeamNameBar = styled.div`
    width: 100%;
    padding: 15px 0;
    background-color: #116530;
    color: white;
    font-family: ChosunGu;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const SendChatWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
    margin-bottom: 37px;
    width: 680px;
    @media (max-width: 800px) {
        width: 480px;
        padding: 0 10px;
    }
    @media (max-width: 640px) {
        width: 340px;
        padding: 0 10px;
    }
`;

const ChatContentWrapper = styled.div`
    flex: 1;
    width: 690px;
    margin-bottom: 37px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
    max-height: 80%; // 최대 높이를 80%로 설정
    
    &::-webkit-scrollbar {
        width: 10px  ;  // 스크롤바의 너비
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(17, 101, 48, 0.5) ; // 스크롤바 색상
        border-radius: 10px ; // 스크롤바 둥근 테두리
        height: 50px; // 스크롤바의 높이를 조정
    }

    &::-webkit-scrollbar-track {
        background: rgba(17, 101, 48, 0.1) ;  // 스크롤바 뒷 배경 색상
        margin-top: 30px;
    }

    &::-webkit-scrollbar-button {
        display: none  /* 스크롤바 버튼 숨기기 */
    }

    @media (max-width: 800px) {
        width: 480px;
        padding: 0 10px;
        padding-top: 20px; // 상단 여백 유지
        max-height: 70%; // 최대 높이를 70%로 설정
    }

    @media (max-width: 640px) {
        width: 340px;
        padding: 0 10px;
        padding-top: 20px; // 상단 여백 유지
        max-height: 60%; // 최대 높이를 60%로 설정
    }
`;

const ProfileImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin: 0px 5px 5px 5px;
`;

const ChatContent = styled.div`
    margin: 5px 0;
    border: 1px solid #116530;
    min-height: 15px;
    border-radius: 10px;
    padding: 15px;
    font-size: 14px;
    font-family: ChosunGu;
    word-wrap: break-word;
    white-space: pre-wrap;
    position: relative;
    line-height: 160%;
`;

const TimeText = styled.div`
    font-family: ChosunGu;
    font-size: 11px;
    color: #888;
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 4px;
    margin-right: 4px;
`;

const ChatOther = styled.div`
    max-width: 90%;
    margin: 15px 0;
    align-self: flex-start;
    display: flex;
`;

const ChatMy = styled.div`
    max-width: 90%;
    margin: 15px 0;
    align-self: flex-end;
    display: flex;
    flex-direction: row-reverse;
`;

const NameText = styled.div`
    font-family: ChosunGu;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 3px;
`;

const DateDivider = styled.div`
    text-align: center;
    padding: 10px 0;
    margin: 10px 0;
    font-family: ChosunGu;
    font-size: 14px;
    letter-spacing: 1px;
    color: #888;
    border-bottom: 1px solid #ddd;
`;

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-image: url('/img/clover.png');
    background-size: cover;
    background-color: #116530;
    background-position: center;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

const S = {
    Container,
    TeamNameBar,
    SendChatWrapper,
    ChatContentWrapper,
    ChatOther,
    ChatMy,
    ProfileImg,
    ChatContent,
    TimeText,
    NameText,
    DateDivider,
    FloatingButton,
};

export default S;
