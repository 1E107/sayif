import React, { useState, useEffect, useRef, useCallback } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useSelector } from 'react-redux';
import {
    createSession,
    createConnection,
    closeSession,
} from '../../api/OpenViduApi';
import { getTeamSessionId } from '../../api/MentoringApi';
import S from './style/MeetingStyled';
import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import Videocam from '@mui/icons-material/Videocam';
import VideocamOff from '@mui/icons-material/VideocamOff';
import Close from '@mui/icons-material/Close';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import ScreenShare from '@mui/icons-material/ScreenShare';
import StopScreenShare from '@mui/icons-material/StopScreenShare';
import Send from '@mui/icons-material/Send';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chat from '@mui/icons-material/Chat';

const OpenViduApp = () => {
    const [sessionId, setSessionId] = useState('');
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [message, setMessage] = useState('');
    const [sessionStatus, setSessionStatus] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoStopped, setIsVideoStopped] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false); // 화면 공유 상태 추가
    const [chatDisplay, setChatDisplay] = useState('none');
    const [subscribers, setSubscribers] = useState([]); // 추가: 구독자 관리 상태
    const videoContainerRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const { token, member } = useSelector(state => state.member);

    let OV = useRef(null);
    let session = useRef(null);
    let publisher = useRef(null);

    useEffect(() => {
        return () => {
            if (session.current) {
                session.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const response = await getTeamSessionId(member.teamId, token);
                const teamSessionId = response.sessionId;
                setSessionId(teamSessionId);
                if (teamSessionId === null) {
                    setSessionStatus(
                        member.role === 'Mentor' ? 'mentor' : 'mentee',
                    );
                } else {
                    setSessionStatus('exists');
                }
            } catch (error) {
                console.error(
                    'Error fetching session ID:',
                    error.response ? error.response.data : error.message,
                );
            }
        };

        checkSessionStatus();
    }, [token, member.teamId, member.role]);

    const handleCreateNewSession = async () => {
        try {
            const newSessionId = await createSession(token, sessionId); //openvidu/api/sessions
            setCurrentSessionId(newSessionId);
            setSessionId(newSessionId);
            joinSession(newSessionId);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const joinSession = async sessionId => {
        if (!sessionId) {
            console.error('No session ID provided');
            return;
        }

        OV.current = new OpenVidu();
        session.current = OV.current.initSession();

        session.current.on('streamDestroyed', event => {
            const stream = event.stream.streamManager.videos[0].video;
            if (stream) {
                stream.remove();
            }
            const newSubscribers = subscribers.filter(
                sub => sub.stream !== event.stream,
            );
            setSubscribers(newSubscribers); // 구독자 상태 갱신
        });

        session.current.on('streamCreated', event => {
            const subscriber = session.current.subscribe(
                event.stream,
                videoContainerRef.current,
            );
            subscriber.on('videoElementCreated', event => {
                event.element.style.width = '200px';
                event.element.style.height = '150px';
            });
            setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]); // 구독자 추가
        });

        session.current.on('signal:chat', event => {
            const chatMessages = chatMessagesRef.current;
            const newMessage = document.createElement('div');
            newMessage.textContent = event.data;
            chatMessages.appendChild(newMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });

        try {
            const connectionToken = await createConnection(token, sessionId); //openvidu/api/sessions/{sessionId}/connection
            await session.current.connect(connectionToken);
            setIsConnected(true);
            if (!publisher.current) {
                publisher.current = OV.current.initPublisher(
                    videoContainerRef.current,
                    {
                        resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    },
                );
                publisher.current.once('videoElementCreated', event => {
                    event.element.classList.add('published');
                });
                session.current.publish(publisher.current);
            }
        } catch (error) {
            console.error('Error connecting to session:', error);
        }
    };

    const startScreenShare = async () => {
        // 중복 호출 방지
        if (isScreenSharing) {
            // 화면 공유 중이라면 중지
            try {
                if (publisher.current) {
                    const screenPublisher = publisher.current;
                    const screenStream = screenPublisher.stream;
                    const videoTracks = screenStream
                        .getMediaStream()
                        .getVideoTracks();
                    videoTracks.forEach(track => track.stop());
                    session.current.unpublish(screenPublisher);
                    publisher.current = null;
                }
                setIsScreenSharing(false);
            } catch (error) {
                console.error('Error stopping screen share:', error);
            }
        } else {
            try {
                // 기존 화면 공유가 있을 경우 종료
                if (publisher.current) {
                    const screenPublisher = publisher.current;
                    session.current.unpublish(screenPublisher);
                    const videoTracks = screenPublisher.stream
                        .getMediaStream()
                        .getVideoTracks();
                    videoTracks.forEach(track => track.stop());
                    publisher.current = null;
                }
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                });
                const screenPublisher = OV.current.initPublisher(undefined, {
                    videoSource: stream.getVideoTracks()[0],
                    publishAudio: true,
                    publishVideo: true,
                });
                session.current.publish(screenPublisher);
                publisher.current = screenPublisher; // 화면 공유 객체를 새로 설정
                setIsScreenSharing(true);
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    console.error('Screen sharing permission denied:', error);
                } else {
                    console.error('Error sharing the screen:', error);
                }
            }
        }
    };

    const sendMessage = () => {
        if (!session.current) {
            console.error('No active session to send a message');
            return;
        }

        session.current
            .signal({
                data: message,
                to: [],
                type: 'chat',
            })
            .then(() => {
                console.log('Message successfully sent');
                setMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
    };

    const toggleMute = () => {
        if (publisher.current) {
            if (isMuted) {
                publisher.current.publishAudio(true);
            } else {
                publisher.current.publishAudio(false);
            }
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (publisher.current) {
            const videoTracks = publisher.current.stream
                .getMediaStream()
                .getVideoTracks();
            if (isVideoStopped) {
                publisher.current.publishVideo(true);
                videoTracks.forEach(track => (track.enabled = true));
            } else {
                publisher.current.publishVideo(false);
                videoTracks.forEach(track => (track.enabled = false));
            }
            setIsVideoStopped(!isVideoStopped);
        }
    };

    const handleCloseSession = async () => {
        if (!currentSessionId) {
            console.error('No active session to close');
            return;
        }

        try {
            await closeSession(token, currentSessionId);
            setCurrentSessionId(null);
            setIsConnected(false);
        } catch (error) {
            console.error('Error closing session:', error);
        }
    };

    const handleChatDisplay = useCallback(() => {
        setChatDisplay(chatDisplay === 'none' ? 'block' : 'none');
    }, [chatDisplay]);

    return (
        <S.Container>
            {!isConnected && (
                <S.CenteredContainer>
                    <S.Logo src="/logo.png" alt="Logo" />
                    {sessionStatus === 'mentor' && (
                        <S.CenteredContainer>
                            <OutlinedInput
                                type="text"
                                onChange={e => setSessionId(e.target.value)}
                                placeholder="Enter Session ID"
                                style={{
                                    border: '1px solid #116530CC',
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            />
                            <S.DiffBtn onClick={handleCreateNewSession}>
                                회의실 생성
                            </S.DiffBtn>
                        </S.CenteredContainer>
                    )}
                    {sessionStatus === 'exists' && (
                        <S.CenteredContainer>
                            <OutlinedInput
                                type="text"
                                value={sessionId}
                                onChange={e => setSessionId(e.target.value)}
                                placeholder="Enter Session ID"
                                style={{
                                    border: '1px solid #116530CC',
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            />
                            <S.DiffBtn onClick={() => joinSession(sessionId)}>
                                회의실 입장
                            </S.DiffBtn>
                        </S.CenteredContainer>
                    )}
                </S.CenteredContainer>
            )}
            <S.VideoContainer
                ref={videoContainerRef}
                $isConnected={isConnected}
            />
            {isConnected && (
                <>
                    <S.ChatContainer
                        id="chat-container"
                        $isConnected={isConnected}
                        display={chatDisplay}
                    >
                        <h3>채팅</h3>
                        <S.ChatMessages
                            id="chat-messages"
                            ref={chatMessagesRef}
                        />
                        <S.ChatInputContainer>
                            <OutlinedInput
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Enter your message"
                                style={{
                                    border: '1px solid #116530CC',
                                    width: '100%',
                                    marginRight: '20px',
                                }}
                            />
                            <S.IconButtonStyled onClick={sendMessage}>
                                <Send />
                            </S.IconButtonStyled>
                        </S.ChatInputContainer>
                    </S.ChatContainer>
                    <S.ButtonContainer $isConnected={isConnected}>
                        {sessionStatus === 'mentor' && (
                            <S.IconButtonStyled onClick={handleCloseSession}>
                                <Close />
                            </S.IconButtonStyled>
                        )}
                        <S.IconButtonStyled onClick={startScreenShare}>
                            {isScreenSharing ? (
                                <StopScreenShare />
                            ) : (
                                <ScreenShare />
                            )}
                        </S.IconButtonStyled>
                        <S.IconButtonStyled onClick={toggleMute}>
                            {isMuted ? <MicOff /> : <Mic />}
                        </S.IconButtonStyled>
                        <S.IconButtonStyled onClick={toggleVideo}>
                            {isVideoStopped ? <Videocam /> : <VideocamOff />}
                        </S.IconButtonStyled>
                        <S.IconButtonStyled onClick={handleChatDisplay}>
                            <Chat />
                        </S.IconButtonStyled>
                    </S.ButtonContainer>
                </>
            )}
        </S.Container>
    );
};

export default OpenViduApp;
