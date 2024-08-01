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
    const videoContainerRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const { token, member } = useSelector(state => state.member);

    const serverUrl = 'http://localhost:9090';
    const username = 'OPENVIDUAPP';
    const password = 'bangcutsoragodoongmeruohboksayif';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    let OV = useRef(null); // Ref로 OV를 관리
    let session = useRef(null); // Ref로 session을 관리

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

                const response = await getTeamSessionId(member.team_id, token);
                console.log(response);
                const teamSessionId = response.session_id;
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
    }, [token, member.team_id, member.role]);

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
                    .connect(token)
                    .then(() => {
                        setIsConnected(true); // 사용자가 세션에 연결된 상태로 설정
                        if (!document.querySelector('video.published')) {
                            const publisher = OV.current.initPublisher(
                                videoContainerRef.current,
                                {
                                    resolution: '640x480',
                                    frameRate: 30,
                                    insertMode: 'APPEND',
                                    mirror: false,
                                },
                            );
                            publisher.once('videoElementCreated', event => {
                                event.element.classList.add('published');
                            });
                            session.current.publish(publisher);
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
                        <button onClick={createNewSession}>
                            Create New Session
                        </button>
                    )}
                    {sessionStatus === 'exists' && (
                        <>
                            <input
                                type="text"
                                value={sessionId}
                                onChange={e => setSessionId(e.target.value)}
                                placeholder="Enter Session ID"
                            />
                            <button onClick={() => joinSession(sessionId)}>
                                Join Session
                            </button>
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
                        <button onClick={sendMessage}>Send Message</button>
                    </S.ChatContainer>
                </S.ContentContainer>
            )}

            {isConnected && (
                <S.ButtonContainer $isConnected={isConnected}>
                    <S.Button onClick={closeSession}>Close Session</S.Button>
                    <S.Button onClick={startScreenShare}>Share Screen</S.Button>
                </S.ButtonContainer>
            )}
        </S.Container>
    );
};

export default OpenViduApp;
