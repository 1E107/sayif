import React, { useEffect, useState, useRef } from 'react';
import S from './style/ChatStyled';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import webSocketService from '../../api/WebSocketService';
import { API_BASE_URL } from '../../api/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { token, member } = useSelector((state) => state.member);
  const teamId = member.teamId;
  const currentUserNickname = member.nickname;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const chatContentEndRef = useRef(null);
  
  useEffect(() => {
    let isSubscribed = true;

    axios
      .get(`${API_BASE_URL}/team/${teamId}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (isSubscribed) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch messages', error);
      });

    webSocketService.connect(token);

    const subscription = webSocketService.subscribe(`/topic/${teamId}`, (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => {
        if (
          !prevMessages.some(
            (msg) =>
              msg.sendAt === message.sendAt && msg.msgContent === message.msgContent
          )
        ) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendBtn = () => {
    const message = {
      msgContent: newMessage,
    };

    webSocketService.sendMessage(`/app/team/${teamId}/chat`, message);
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') { 
      handleSendBtn();
    }
  };

  return (
    <S.Container>

      <S.ChatContentWrapper>11
        {messages.map((msg, index) =>
          msg.nickname === currentUserNickname ? (
            <S.ChatMy key={index}>
              <S.ProfileImg src={msg.profileImg ? msg.profileImg : "/basic-profile.PNG"} />
              <div>
                <S.ChatContent style={{ backgroundColor: '#116530', color: 'white' }}>
                  {msg.msgContent}
                </S.ChatContent>
                <S.TimeText align="right">
                  {new Date(msg.sendAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </S.TimeText>
              </div>
            </S.ChatMy>
          ) : (
            <S.ChatOther key={index}>
              <S.ProfileImg src={msg.profileImg ? msg.profileImg : "/basic-profile.PNG"} />
              <div>
                <S.NameText>{msg.nickname}</S.NameText>
                <S.ChatContent>{msg.msgContent}</S.ChatContent>
                <S.TimeText>
                  {new Date(msg.sendAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </S.TimeText>
              </div>
            </S.ChatOther>
          )
        )}
        <div ref={chatContentEndRef} />
      </S.ChatContentWrapper>
      <FormControl>
        <S.SendChatWrapper>
          <OutlinedInput
            id="component-outlined"
            placeholder="메시지를 입력하세요."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
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
