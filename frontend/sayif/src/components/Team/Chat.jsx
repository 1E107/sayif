import React, { useEffect, useState } from 'react';
import S from './style/ChatStyled';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import webSocketService from '../../api/WebSocketService';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { token, member } = useSelector(state => state.member);
  const teamId = member.teamId;
  const currentUsername = member.username; 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // 서버에서 채팅 기록 가져오기
    axios.get(`${API_BASE_URL}/team/${teamId}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setMessages(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch messages', error);
    });

    // WebSocket 연결 및 구독
    webSocketService.connect(token);
    const subscription = webSocketService.subscribe(`/topic/${teamId}`, (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // 페이지가 언마운트될 때 구독 해제
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      webSocketService.disconnect();
    };
  }, [teamId, token]);

  const handleSendBtn = () => {
    const message = {
      msgContent: newMessage,
    };

    webSocketService.sendMessage(`/app/team/${teamId}/chat`, message);
    setNewMessage('');
  };

  return (
    <S.Container>
      <S.ChatContentWrapper>
        {messages.map((msg, index) => (
          msg.userId === currentUsername ? (
            <S.ChatMy key={index}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                  {msg.username} - {new Date(msg.sendAt).toLocaleTimeString()}
                </S.MyInfoText>
                <S.ChatContent style={{ backgroundColor: '#116530', color: 'white' }}>
                  {msg.msgContent}
                </S.ChatContent>
              </div>
              <S.ProfileImg src="/basic-profile.PNG" />
            </S.ChatMy>
          ) : (
            <S.ChatOther key={index}>
              <S.ProfileImg src="/basic-profile.PNG" />
              <div>
                <S.OtherInfoText>
                  {msg.username} - {new Date(msg.sendAt).toLocaleTimeString()}
                </S.OtherInfoText>
                <S.ChatContent>
                  {msg.msgContent}
                </S.ChatContent>
              </div>
            </S.ChatOther>
          )
        ))}
      </S.ChatContentWrapper>
      <FormControl>
        <S.SendChatWrapper>
          <OutlinedInput
            id="component-outlined"
            placeholder="메시지를 입력하세요."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ border: '1px solid #116530CC', width: '1000px' }}
          />
          <SendIcon
            style={{ color: '#116530CC', marginLeft: '10px', fontSize: '30px' }}
            onClick={handleSendBtn}
          />
        </S.SendChatWrapper>
      </FormControl>
    </S.Container>
  );
};

export default Chat;
