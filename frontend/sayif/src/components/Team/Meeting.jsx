import React, { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useSelector } from 'react-redux';
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
    const videoContainerRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const { token, member } = useSelector(state => state.member);

    const serverUrl = 'http://i11e107.p.ssafy.io:7777';
    const username = 'OPENVIDUAPP';
    const password = 'bangcutsoragodoongmeruohboksayif';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    const wsUrl = 'ws://i11e107.p.ssafy.io:4443/openvidu';

    let OV = useRef(null); // Ref로 OV를 관리
    let session = useRef(null); // Ref로 session을 관리
    let publisher = useRef(null); // 퍼블리셔도 Ref로 관리

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
                console.log('member 정보:', member);

                const response = await getTeamSessionId(member.teamId, token);
                console.log(response);
                const teamSessionId = response.sessionId;
                setSessionId(teamSessionId);
                console.log(teamSessionId);
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

    const createNewSession = () => {
        fetch(`${serverUrl}/openvidu/api/sessions`, {
            method: 'POST',
            headers: {
                Authorization: basicAuth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create session');
                }
                return response.text(); // JSON이 아닌 텍스트로 응답 처리
            })
            .then(newSessionId => {
                setCurrentSessionId(newSessionId);
                setSessionId(newSessionId);
                joinSession(newSessionId);
            })
            .catch(error => {
                console.error('Error creating session:', error);
            });
    };

    const joinSession = sessionId => {
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
        });

        session.current.on('signal:chat', event => {
            const chatMessages = chatMessagesRef.current;
            const newMessage = document.createElement('div');
            newMessage.textContent = event.data;
            chatMessages.appendChild(newMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });

        fetch(`${serverUrl}/openvidu/api/sessions/${sessionId}/connection`, {
            method: 'POST',
            headers: {
                Authorization: basicAuth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create connection');
                }
                return response.text(); // JSON이 아닌 텍스트로 응답 처리
            })
            .then(token => {
                session.current
                    .connect(token, { wsUri: wsUrl })
                    .then(() => {
                        setIsConnected(true); // 사용자가 세션에 연결된 상태로 설정
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
                            publisher.current.once(
                                'videoElementCreated',
                                event => {
                                    event.element.classList.add('published');
                                },
                            );
                            session.current.publish(publisher.current);
                        }
                    })
                    .catch(error => {
                        console.error('Error connecting to session:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching token:', error);
            });
    };

    const startScreenShare = () => {
        navigator.mediaDevices
            .getDisplayMedia({ video: true })
            .then(stream => {
                const screenPublisher = OV.current.initPublisher(undefined, {
                    videoSource: stream.getVideoTracks()[0],
                    publishAudio: true,
                    publishVideo: true,
                });

                session.current.publish(screenPublisher);
            })
            .catch(error => console.error('Error sharing the screen:', error));
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
            if (isVideoStopped) {
                publisher.current.publishVideo(true);
            } else {
                publisher.current.publishVideo(false);
            }
            setIsVideoStopped(!isVideoStopped);
        }
    };

    const closeSession = () => {
        if (!currentSessionId) {
            console.error('No active session to close');
            return;
        }

        fetch(`${serverUrl}/openvidu/api/sessions/${currentSessionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: basicAuth,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to close session');
                }
                return response.text();
            })
            .then(message => {
                console.log(message);
                setCurrentSessionId(null);
                setIsConnected(false); // 사용자가 세션에서 연결 해제된 상태로 설정
            })
            .catch(error => {
                console.error('Error closing session:', error);
            });
    };

    return (
        <S.Container>
            <S.Logo src="/logo.png" alt="Logo" />
            {!isConnected && (
                <>
                    {sessionStatus === 'mentor' && (
                        <S.DiffBtn onClick={createNewSession}>
                            Create New Session
                        </S.DiffBtn>
                    )}
                    {sessionStatus === 'exists' && (
                        <>
                            <input
                                type="text"
                                value={sessionId}
                                onChange={e => setSessionId(e.target.value)}
                                placeholder="Enter Session ID"
                            />
                            <S.DiffBtn onClick={() => joinSession(sessionId)}>
                                Join Session
                            </S.DiffBtn>
                        </>
                    )}
                </>
            )}
            <S.VideoContainer
                ref={videoContainerRef}
                $isConnected={isConnected}
            ></S.VideoContainer>
            {isConnected && (
                <S.ContentContainer>
                    <S.ChatContainer
                        id="chat-container"
                        $isConnected={isConnected}
                    >
                        <h2>Chat</h2>
                        <div id="chat-messages" ref={chatMessagesRef}></div>
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                        <S.DiffBtn onClick={sendMessage}>
                            Send Message
                        </S.DiffBtn>
                    </S.ChatContainer>
                </S.ContentContainer>
            )}

            {isConnected && (
                <S.ButtonContainer $isConnected={isConnected}>
                    <S.CustomBtn onClick={closeSession}>
                        Close Session
                    </S.CustomBtn>
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
            )}
        </S.Container>
    );
};

export default OpenViduApp;
