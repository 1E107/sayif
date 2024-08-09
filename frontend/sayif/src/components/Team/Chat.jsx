import React, { useEffect, useRef, useState } from 'react';
import S from './style/ChatStyled';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import webSocketService from '../../api/WebSocketService';
import { API_BASE_URL } from '../../api/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { token, member } = useSelector(state => state.member);
    const teamId = member.teamId;
    const currentUserNickname = member.nickname;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chatContentRef = useRef(null);
    const chatContentEndRef = useRef(null);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return `${time}`;
    };

    const groupMessagesByDate = (messages) => {
        const groups = {};
        messages.forEach(message => {
            const date = new Date(message.sendAt).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });
        return Object.entries(groups).map(([date, messages]) => ({date, messages}));
    };

    useEffect(() => {
        let isSubscribed = true;

        axios
            .get(`${API_BASE_URL}/team/${teamId}/chat`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                if (isSubscribed) {
                    setMessages(response.data);
                    if (chatContentRef.current) {
                        chatContentRef.current.scrollTop =
                            chatContentRef.current.scrollHeight;
                    }
                }
            })
            .catch(error => {
                console.error('Failed to fetch messages', error);
            });

        webSocketService.connect(token);

        const subscription = webSocketService.subscribe(
            `/topic/${teamId}`,
            message => {
                console.log('Received message:', message);
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    const messageDate = new Date(message.sendAt).toLocaleDateString();
                    const lastMessageDate = newMessages.length > 0 
                        ? new Date(newMessages[newMessages.length - 1].sendAt).toLocaleDateString()
                        : null;

                    if (messageDate !== lastMessageDate) {
                        newMessages.push({type: 'dateDivider', date: messageDate});
                    }

                    if (!newMessages.some(
                        msg =>
                            msg.sendAt === message.sendAt &&
                            msg.msgContent === message.msgContent
                    )) {
                        newMessages.push(message);
                    }
                    return newMessages;
                });
            },
        );

        return () => {
            isSubscribed = false;
            if (subscription) {
                subscription.unsubscribe();
            }
            webSocketService.disconnect();
        };
    }, [teamId, token, currentUserNickname]);

    useEffect(() => {
        if (chatContentEndRef.current) {
            chatContentEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendBtn = () => {
        if (newMessage.trim() === '') return;

        const message = {
            msgContent: newMessage,
        };

        webSocketService.sendMessage(`/app/team/${teamId}/chat`, message);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { 
            handleSendBtn();
        }
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <S.Container>
            <S.ChatContentWrapper ref={chatContentRef}>
                {groupedMessages.map(({date, messages}) => (
                    <React.Fragment key={date}>
                        <S.DateDivider>{date}</S.DateDivider>
                        {messages.map((msg, index) =>
                            msg.nickname === currentUserNickname ? (
                                <S.ChatMy key={index}>
                                    <S.ProfileImg src={msg.profileImg} />
                                    <div>
                                        <S.ChatContent style={{ backgroundColor: '#116530', color: 'white' }}>
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
                                        <S.ChatContent>{msg.msgContent}</S.ChatContent>
                                        <S.TimeText>
                                            {formatDateTime(msg.sendAt)}
                                        </S.TimeText>
                                    </div>
                                </S.ChatOther>
                            )
                        )}
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
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ border: '1px solid #116530CC', width: '1010px'}}
                    />
                    <SendIcon
                        style={{ color: '#116530CC', marginLeft: '20px', fontSize: '30px' }}
                        onClick={handleSendBtn}
                    />
                </S.SendChatWrapper>
            </FormControl>
        </S.Container>
    );
};

export default Chat;