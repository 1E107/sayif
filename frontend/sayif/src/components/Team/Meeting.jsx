import React, { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useSelector } from 'react-redux';
import {
    createSession,
    createConnection,
    closeSession,
    deleteConnection,
} from '../../api/OpenViduApi';
import { getTeamSessionId } from '../../api/MentoringApi';
import S from './style/MeetingStyled';

const OpenViduApp = () => {
    const [sessionId, setSessionId] = useState('');
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [message, setMessage] = useState('');
    const [sessionStatus, setSessionStatus] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoStopped, setIsVideoStopped] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false); // 화면 공유 상태 추가
    const [subscribers, setSubscribers] = useState([]); // 추가: 구독자 관리 상태
    const videoContainerRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const { token, member } = useSelector(state => state.member);

    // OpenVidu 서버의 주소를 http 또는 https로 설정
    // const openViduUrl = 'http://i11e107.p.ssafy.io:4443';

    // WebSocket URL을 ws 또는 wss로 설정
    const wsUrl = 'wss://i11e107.p.ssafy.io/api/openvidu';

    let OV = useRef(null);
    let session = useRef(null);
    let publisher = useRef(null);
    let connectionId;

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
            const newSessionId = await createSession(); //openvidu/api/sessions
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

        OV.current = new OpenVidu({
            url: wsUrl,
        });
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
            const conn = await createConnection(sessionId); //openvidu/api/sessions/{sessionId}/connection
            const token = conn.token;
            connectionId = conn.connectionId;
            console.log('connectionId: ' + connectionId);
            await session.current.connect(token, { wsUri: wsUrl });
            console.log('wsUrl: ' + wsUrl);
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
            return;
        }
        setIsScreenSharing(true);

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            const screenPublisher = OV.current.initPublisher(undefined, {
                videoSource: stream.getVideoTracks()[0],
                publishAudio: true,
                publishVideo: true,
            });

            session.current.publish(screenPublisher);
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.error('Screen sharing permission denied:', error);
            } else {
                console.error('Error sharing the screen:', error);
            }
        } finally {
            setIsScreenSharing(false);
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
            await closeSession(currentSessionId);
            setCurrentSessionId(null);
            setIsConnected(false);
        } catch (error) {
            console.error('Error closing session:', error);
        }
    };

    const handleDeleteConnection = async () => {
        if (!connectionId) {
            console.error('No active connection to delete');
            return;
        }

        try {
            await deleteConnection(sessionId, connectionId);
            setIsConnected(false);
        } catch (error) {
            console.error('Error deleting connection:', error);
        }
    };

    return (
        <S.Container>
            {!isConnected && (
                <S.CenteredContainer>
                    <S.Logo src="/logo.png" alt="Logo" />
                    {sessionStatus === 'mentor' && (
                        <S.DiffBtn onClick={handleCreateNewSession}>
                            Create New Session
                        </S.DiffBtn>
                    )}
                    {sessionStatus === 'exists' && (
                        <S.HorizontalContainer>
                            <S.Input
                                type="text"
                                value={sessionId}
                                onChange={e => setSessionId(e.target.value)}
                                placeholder="Enter Session ID"
                            />
                            <S.DiffBtn onClick={() => joinSession(sessionId)}>
                                Join Session
                            </S.DiffBtn>
                        </S.HorizontalContainer>
                    )}
                </S.CenteredContainer>
            )}
            <S.VideoContainer
                ref={videoContainerRef}
                $isConnected={isConnected}
            ></S.VideoContainer>
            {isConnected && (
                <>
                    <S.ChatContainer
                        id="chat-container"
                        $isConnected={isConnected}
                    >
                        <h2>Chat</h2>
                        <S.ChatMessages
                            id="chat-messages"
                            ref={chatMessagesRef}
                        ></S.ChatMessages>
                        <S.ChatInputContainer>
                            <S.Input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Enter your message"
                            />
                            <S.DiffBtn onClick={sendMessage}>
                                Send Message
                            </S.DiffBtn>
                        </S.ChatInputContainer>
                    </S.ChatContainer>

                    <S.ButtonContainer $isConnected={isConnected}>
                        {sessionStatus === 'mentor' ? (
                            <S.CustomBtn onClick={handleCloseSession}>
                                Close Session
                            </S.CustomBtn>
                        ) : (
                            <S.CustomBtn onClick={handleDeleteConnection}>
                                Delete Connection
                            </S.CustomBtn>
                        )}
                        <S.CustomBtn onClick={startScreenShare}>
                            Share Screen
                        </S.CustomBtn>
                        <S.CustomBtn onClick={toggleMute}>
                            {isMuted ? 'Unmute' : 'Mute'}
                        </S.CustomBtn>
                        <S.CustomBtn onClick={toggleVideo}>
                            {isVideoStopped ? 'Start Video' : 'Stop Video'}
                        </S.CustomBtn>
                    </S.ButtonContainer>
                </>
            )}
        </S.Container>
    );
};

export default OpenViduApp;
