import React, { useEffect, useRef, useState } from 'react';
import S from './style/ChatStyled';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import webSocketService from '../../api/WebSocketService';
import { API_BASE_URL } from '../../api/config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ChatbotModal from './ChatBotModal';

const Chat = () => {
    const { token, member } = useSelector(state => state.member);
    const teamId = member.teamId;
    const currentUserNickname = member.nickname;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);

    const chatContentRef = useRef(null);
    const chatContentEndRef = useRef(null);

    const handleChatBotButtonClick = () => {
        setIsChatBotModalOpen(true);
    };

    const handleChatBotModalClose = () => {
        setIsChatBotModalOpen(false);
    };

    const isValidDate = dateString => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    const formatDateTime = dateString => {
        if (!isValidDate(dateString)) {
            return;
        }
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${time}`;
    };

    const groupMessagesByDate = messages => {
        const groups = {};
        messages.forEach(message => {
            if (!isValidDate(message.sendAt)) {
                return;
            }
            const date = new Date(message.sendAt);
            const formattedDate = `${date.getFullYear().toString().slice(
                -2)}.${(date.getMonth() + 1).toString().padStart(2,
                '0')}.${date.getDate().toString().padStart(2,
                '0')}.${getKoreanDayOfWeek(date)}`;
            if (!groups[formattedDate]) {
                groups[formattedDate] = [];
            }
            groups[formattedDate].push(message);
        });
        console.log('Grouped messages:', groups);
        return Object.entries(groups).map(([formattedDate, messages]) => ({
            date: formattedDate,
            messages,
        }));
    };

    const getKoreanDayOfWeek = date => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[date.getDay()];
    };

    useEffect(() => {
        let isSubscribed = true;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/team/${teamId}/chat`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                if (isSubscribed) {
                    setMessages(response.data);
                    if (chatContentRef.current) {
                        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
                    }
                    console.log('Fetched messages:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch messages', error);
            }
        };

        const setupWebSocket = () => {
            webSocketService.connect(token);
            webSocketService.subscribe(`/topic/${teamId}`, message => {
                if (!isValidDate(message.sendAt)) {
                    return;
                }

                console.log('Received message:', message);

                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, message];
                    console.log('Updated messages:', updatedMessages);
                    return updatedMessages;
                });
            });
        };

        fetchMessages();
        setupWebSocket();

        return () => {
            isSubscribed = false;
            // WebSocket 연결을 끊지 않음 (필요 시 유지)
        };
    }, [teamId, token]);

    useEffect(() => {
        if (chatContentEndRef.current) {
            chatContentEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendBtn = () => {
        if (newMessage.trim() === '') {
            return;
        }

        const message = {
            msgContent: newMessage,
        };

        webSocketService.sendMessage(`/app/team/${teamId}/chat`, message);
        setNewMessage('');
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendBtn();
        }
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <S.Container>
            <S.ChatContentWrapper ref={chatContentRef}>
                {groupedMessages.length === 0 && <div>No messages to
                    display</div>}
                {groupedMessages.map(({ date, messages }) => (
                    <React.Fragment key={date}>
                        <S.DateDivider>{date}</S.DateDivider>
                        {messages.map((msg, index) => {
                            console.log('Rendering message:', msg);
                            return msg.nickname === currentUserNickname ? (
                                <S.ChatMy key={index}>
                                    <S.ProfileImg src={msg.profileImg} />
                                    <div>
                                        <S.ChatContent
                                            style={{
                                                backgroundColor: '#116530',
                                                color: 'white',
                                            }}
                                        >
                                            {msg.msgContent}
                                        </S.ChatContent>
                                        <S.TimeText align="right">
                                            {formatDateTime(msg.sendAt)}
                                        </S.TimeText>
                                    </div>
                                </S.ChatMy>
                            ) : (
                                <S.ChatOther key={index}>
                                    <S.ProfileImg src={msg.profileImg} />
                                    <div>
                                        <S.NameText>{msg.nickname}</S.NameText>
                                        <S.ChatContent>
                                            {msg.msgContent}
                                        </S.ChatContent>
                                        <S.TimeText>
                                            {formatDateTime(msg.sendAt)}
                                        </S.TimeText>
                                    </div>
                                </S.ChatOther>
                            );
                        })}
                    </React.Fragment>
                ))}
                <div ref={chatContentEndRef} />
            </S.ChatContentWrapper>
            <FormControl>
                <S.SendChatWrapper>
                    <OutlinedInput
                        id="component-outlined"
                        placeholder="메시지를 입력하세요."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        multiline
                        rows={1}
                        style={{ border: '1px solid #116530CC', width: '100%' }}
                    />
                    <SendIcon
                        style={{
                            color: '#116530CC',
                            marginLeft: '20px',
                            fontSize: '30px',
                        }}
                        onClick={handleSendBtn}
                    />
                </S.SendChatWrapper>
            </FormControl>
            <S.FloatingButton onClick={handleChatBotButtonClick} />
            <ChatbotModal
                open={isChatBotModalOpen}
                handleClose={handleChatBotModalClose}
            />
        </S.Container>
    );
};

export default Chat;
