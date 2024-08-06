import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';

import OpenViduLayout from './openvidu-layout';
import UserModel from './user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';

import {
    createSession,
    createConnection,
    closeSession,
} from '../../../api/OpenViduApi';
import { getTeamSessionId } from '../../../api/MentoringApi';

var localUser = new UserModel();

class VideoRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();
        let sessionName;
        let userName;
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            currentVideoDevice: undefined,
            sessionStatus: 'initial',
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }

    async componentDidMount() {
        // API 호출 및 상태 설정
        try {
            console.log('getTeamSesionId 호출');
            const response = await getTeamSessionId(
                this.props.member.teamId,
                this.props.userToken,
            );
            const teamSessionId = response.sessionId;
            console.log('teamSessionId: ', teamSessionId);
            this.setState({
                mySessionId: teamSessionId
                    ? teamSessionId
                    : this.state.mySessionId,
                sessionStatus:
                    teamSessionId === null
                        ? this.props.member.role === 'Mentor'
                            ? 'mentor'
                            : 'mentee'
                        : 'exists',
            });
        } catch (error) {
            console.error('Error fetching team session ID:', error);
        }

        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };

        this.layout.initLayoutContainer(
            document.getElementById('layout'),
            openViduLayoutOptions,
        );
        this.setState({ myUserName: this.props.member.nickname });
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);
        // this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            async () => {
                this.subscribeToStreamCreated();
                await this.connectToSession();
                // 세션 객체 생성 후 신호 이벤트 리스너 등록
                this.state.session.on('signal:sessionEnded', event => {
                    console.log('Session ended signal received:', event);
                    alert('회의가 종료되었습니다.');
                    this.leaveSession();
                });
            },
        );
    }
    async leaveSession() {
        const mySession = this.state.session;
        const mySessionId = this.state.mySessionId;

        if (this.state.sessionStatus === 'mentor') {
            try {
                await closeSession(this.props.userToken, mySessionId);
                // 세션 종료 신호 전송
                this.state.session.signal({
                    data: 'Session Ended', // 메타데이터, 필요에 따라 수정 가능
                    to: [], // 모든 참가자에게 신호 전송
                    type: 'sessionEnded',
                });
            } catch (error) {
                console.error('Error closing session:', error);
                alert('Error closing session: ' + error.message);
            }
        }
        if (mySession) {
            mySession.disconnect();
        }

        try {
            const response = await getTeamSessionId(
                this.props.member.teamId,
                this.props.userToken,
            );
            const teamSessionId = response.sessionId;
            console.log('teamSessionId: ', teamSessionId);
            this.setState({
                mySessionId: teamSessionId
                    ? teamSessionId
                    : this.state.mySessionId,
            });
        } catch (error) {
            console.error('Error fetching team session ID:', error);
        }

        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            myUserName: this.props.member.nickname,
            localUser: undefined,
        });
        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }

    async connectToSession() {
        if (this.props.token !== undefined) {
            console.log('token received: ', this.props.token);
            this.connect(this.props.token);
        } else {
            try {
                var _token = await this.getToken();
                console.log(_token);
                this.connect(_token);
            } catch (error) {
                console.error(
                    'There was an error getting the token:',
                    error.code,
                    error.message,
                );
                if (this.props.error) {
                    this.props.error({
                        error: error.error,
                        messgae: error.message,
                        code: error.code,
                        status: error.status,
                    });
                }
                alert('There was an error getting the token:', error.message);
            }
        }
    }

    connect(token) {
        this.state.session
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
                this.connectWebCam();
            })
            .catch(error => {
                if (this.props.error) {
                    this.props.error({
                        error: error.error,
                        messgae: error.message,
                        code: error.code,
                        status: error.status,
                    });
                }
                alert(
                    'There was an error connecting to the session:',
                    error.message,
                );
                console.log(
                    'There was an error connecting to the session:',
                    error.code,
                    error.message,
                );
            });
    }

    async connectWebCam() {
        await this.OV.getUserMedia({
            audioSource: undefined,
            videoSource: undefined,
        });
        var devices = await this.OV.getDevices();
        var videoDevices = devices.filter(
            device => device.kind === 'videoinput',
        );

        let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed', () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    }
                });
            });
        }
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
        });

        this.setState(
            { currentVideoDevice: videoDevices[0], localUser: localUser },
            () => {
                this.state.localUser
                    .getStreamManager()
                    .on('streamPlaying', e => {
                        this.updateLayout();
                        publisher.videos[0].video.parentElement.classList.remove(
                            'custom-class',
                        );
                    });
            },
        );
    }

    updateSubscribers() {
        var subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) {
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                        isScreenShareActive:
                            this.state.localUser.isScreenShareActive(),
                    });
                }
                this.updateLayout();
            },
        );
    }

    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({
            isVideoActive: localUser.isVideoActive(),
        });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({
            isAudioActive: localUser.isAudioActive(),
        });
        this.setState({ localUser: localUser });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter(
            user => user.getStreamManager().stream === stream,
        )[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', event => {
            const subscriber = this.state.session.subscribe(
                event.stream,
                undefined,
            );
            // var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', e => {
                this.checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove(
                    'custom-class',
                );
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if (this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', event => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            this.updateLayout();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', event => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach(user => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    updateLayout() {
        setTimeout(() => {
            if (this.state.session) {
                // null 체크
                this.layout.updateLayout();
            } else {
                console.error('Layout object is not defined.');
            }
        }, 20);
    }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    screenShare() {
        const videoSource =
            navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        const publisher = this.OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            error => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    this.setState({ showExtensionDialog: true });
                } else if (
                    error &&
                    error.name === 'SCREEN_SHARING_NOT_SUPPORTED'
                ) {
                    alert('Your browser does not support screen sharing');
                } else if (
                    error &&
                    error.name === 'SCREEN_EXTENSION_DISABLED'
                ) {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert(
                        'You need to choose a window or application to share',
                    );
                }
            },
        );

        publisher.once('accessAllowed', () => {
            this.state.session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            this.state.session
                .publish(localUser.getStreamManager())
                .then(() => {
                    localUser.setScreenShareActive(true);
                    this.setState({ localUser: localUser }, () => {
                        this.sendSignalUserChanged({
                            isScreenShareActive:
                                localUser.isScreenShareActive(),
                        });
                    });
                });
        });
        publisher.on('streamPlaying', () => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove(
                'custom-class',
            );
        });
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared =
            this.state.subscribers.some(user => user.isScreenShareActive()) ||
            localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        this.layout.setLayoutOptions(openviduLayoutOptions);
        this.updateLayout();
    }

    toggleChat(property) {
        let display = property;

        if (display === undefined) {
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            this.setState({ chatDisplay: display, messageReceived: false });
        } else {
            console.log('chat', display);
            this.setState({ chatDisplay: display });
        }
        this.updateLayout();
    }

    checkNotification() {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (this.state.session) {
            if (
                document.getElementById('layout').offsetWidth <= 700 &&
                !this.hasBeenUpdated
            ) {
                this.toggleChat('none');
                this.hasBeenUpdated = true;
            }
            if (
                document.getElementById('layout').offsetWidth > 700 &&
                this.hasBeenUpdated
            ) {
                this.hasBeenUpdated = false;
            }
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const mySession = this.state.session;
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };

        if (mySession) {
            return (
                <div className="container" id="container">
                    <ToolbarComponent
                        sessionId={mySessionId}
                        user={localUser}
                        showNotification={this.state.messageReceived}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                        screenShare={this.screenShare}
                        stopScreenShare={this.stopScreenShare}
                        toggleFullscreen={this.toggleFullscreen}
                        leaveSession={this.leaveSession}
                        toggleChat={this.toggleChat}
                    />

                    {/* <DialogExtensionComponent
                        showDialog={this.state.showExtensionDialog}
                        cancelClicked={this.closeDialogExtension}
                    /> */}
                    <div id="layout" className="bounds">
                        {localUser !== undefined &&
                            localUser.getStreamManager() !== undefined && (
                                <div
                                    className="OT_root OT_publisher custom-class"
                                    id="localUser"
                                >
                                    <StreamComponent user={localUser} />
                                </div>
                            )}
                        {this.state.subscribers.map((sub, i) => (
                            <div
                                key={i}
                                className="OT_root OT_publisher custom-class"
                                id="remoteUsers"
                            >
                                <StreamComponent
                                    user={sub}
                                    streamId={sub.streamManager.stream.streamId}
                                />
                            </div>
                        ))}
                        {localUser !== undefined &&
                            localUser.getStreamManager() !== undefined && (
                                <div
                                    className="OT_root OT_publisher custom-class"
                                    style={chatDisplay}
                                >
                                    <ChatComponent
                                        user={localUser}
                                        chatDisplay={this.state.chatDisplay}
                                        close={this.toggleChat}
                                        messageReceived={this.checkNotification}
                                    />
                                </div>
                            )}
                    </div>
                </div>
            );
        }

        return (
            <div className="container" id="container">
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                        display: 'block',
                        width: '80px',
                        margin: '0 auto 20px auto',
                    }}
                />
                <div id="layout" className="bounds">
                    {this.state.sessionStatus === 'mentor' && (
                        <div className="beforeEnterSession">
                            <img src="/logo.png"></img>
                            <OutlinedInput
                                type="text"
                                onChange={e =>
                                    this.setState({
                                        mySessionId: e.target.value,
                                    })
                                }
                                placeholder="Enter Session ID"
                                style={{
                                    border: '1px solid #116530CC',
                                    width: '250px',
                                    marginBottom: '15px',
                                    marginTop: '15px',
                                }}
                            />
                            <Button
                                onClick={this.joinSession}
                                sx={{
                                    backgroundColor: '#0B4619',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#416D19', // 호버 시 배경색
                                        color: '#ffffff', // 호버 시 텍스트 색상
                                    },
                                    padding: '10px',
                                }}
                            >
                                회의실 생성
                            </Button>
                        </div>
                    )}
                    {this.state.sessionStatus === 'exists' && (
                        <div className="beforeEnterSession">
                            <img src="/logo.png"></img>
                            <OutlinedInput
                                readOnly
                                type="text"
                                value={mySessionId}
                                style={{
                                    border: '1px solid #116530CC',
                                    width: '250px',
                                    marginBottom: '15px',
                                    marginTop: '15px',
                                }}
                            />
                            <Button
                                onClick={this.joinSession}
                                sx={{
                                    backgroundColor: '#0B4619',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#416D19', // 호버 시 배경색
                                        color: '#ffffff', // 호버 시 텍스트 색상
                                    },
                                    padding: '10px',
                                }}
                            >
                                회의실 입장
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await createSession(
            this.props.userToken,
            this.state.mySessionId,
        );
        return await createConnection(this.props.userToken, sessionId);
    }
}
export default VideoRoomComponent;