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
import { acquireExperience } from '../../../api/config';
import Swal from 'sweetalert2';

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
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);
        window.addEventListener(
            'fullscreenchange',
            this.handleFullscreenChange,
        );
        window.addEventListener(
            'mozfullscreenchange',
            this.handleFullscreenChange,
        );
        window.addEventListener(
            'webkitfullscreenchange',
            this.handleFullscreenChange,
        );
        window.addEventListener(
            'msfullscreenchange',
            this.handleFullscreenChange,
        );
        if (this.state.session) {
            this.addSessionEventHandlers(this.state.session);
        }
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
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        window.removeEventListener(
            'fullscreenchange',
            this.handleFullscreenChange,
        );
        window.removeEventListener(
            'mozfullscreenchange',
            this.handleFullscreenChange,
        );
        window.removeEventListener(
            'webkitfullscreenchange',
            this.handleFullscreenChange,
        );
        window.removeEventListener(
            'msfullscreenchange',
            this.handleFullscreenChange,
        );
        this.leaveSession();
    }

    addSessionEventHandlers(session) {
        session.on('signal:sessionEnded', event => {
            console.log('Session ended signal received:', event);
            Swal.fire({
                icon: 'info',
                title: '회의 종료',
                html: '회의가 종료되었습니다.<br>팀포인트가 50점 증가했어요!',
                confirmButtonText: '확인',
                confirmButtonColor: '#6c8e23',
            }).then(() => {
                window.location.reload();
            });
        });
    }

    onbeforeunload(event) {
        // this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            async () => {
                this.subscribeToStreamCreated();
                this.addSessionEventHandlers(this.state.session);
                await this.connectToSession();
            },
        );
    }
    async leaveSession() {
        const mySession = this.state.session;
        const mySessionId = this.state.mySessionId;

        if (this.state.sessionStatus === 'mentor' && mySession) {
            try {
                // 세션 종료 신호 전송
                this.state.session.signal({
                    data: 'Session Ended', // 메타데이터, 필요에 따라 수정 가능
                    to: [], // 모든 참가자에게 신호 전송
                    type: 'sessionEnded',
                });
                await acquireExperience(
                    this.props.userToken,
                    this.props.member,
                    50,
                );
                await closeSession(this.props.userToken, mySessionId);
            } catch (error) {
                console.error('Error closing session:', error);
                Swal.fire({
                    icon: 'error',
                    title: '세션 종료 오류',
                    text: `Error closing session: ${error.message}`,
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
            }
        }
        if (mySession) {
            mySession.disconnect();
        }
        console.log(this.state.sessionStatus);
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
            localUser: undefined,
        });
        // if (this.props.leaveSession) {
        //     this.props.leaveSession();
        // }
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
                Swal.fire({
                    icon: 'error',
                    title: '토큰 오류',
                    text: `There was an error getting the token: ${error.message}`,
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
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
                Swal.fire({
                    icon: 'error',
                    title: '세션 연결 오류',
                    text: `There was an error connecting to the session: ${error.message}`,
                    confirmButtonText: '확인',
                    confirmButtonColor: '#6c8e23',
                });
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
            console.log('Stream created event: ', event);
            const subscriber = this.state.session.subscribe(
                event.stream,
                undefined,
            );
            // var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', e => {
                console.log('Stream is playing: ', e);
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

    handleFullscreenChange = () => {
        const bounds = document.querySelector('.bounds');
        if (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        ) {
            // 전체화면 모드일 때
            bounds.style.top = '0px';
        } else {
            // 전체화면 모드가 아닐 때
            bounds.style.top = '64px';
        }
    };

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
                    Swal.fire({
                        icon: 'warning',
                        title: '화면 공유 지원 안함',
                        text: 'Your browser does not support screen sharing',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#6c8e23',
                    });
                } else if (
                    error &&
                    error.name === 'SCREEN_EXTENSION_DISABLED'
                ) {
                    Swal.fire({
                        icon: 'warning',
                        title: '확장 프로그램 비활성화',
                        text: 'You need to enable screen sharing extension',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#6c8e23',
                    });
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    Swal.fire({
                        icon: 'warning',
                        title: '화면 선택 필요',
                        text: 'You need to choose a window or application to share',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#6c8e23',
                    });
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
        const isScreenShared =
            this.state.subscribers.some(user => user.isScreenShareActive()) ||
            localUser.isScreenShareActive();

        if (isScreenShared) {
            // 화면 공유 중인 스트림만 표시하고 나머지는 숨김
            this.state.subscribers.forEach(user => {
                if (user.isScreenShareActive()) {
                    document.getElementById(
                        `remoteUsers_${user.getConnectionId()}`,
                    ).style.display = 'block';
                } else {
                    document.getElementById(
                        `remoteUsers_${user.getConnectionId()}`,
                    ).style.display = 'none';
                }
            });

            if (localUser.isScreenShareActive()) {
                document.getElementById('localUser').style.display = 'block';
            } else {
                document.getElementById('localUser').style.display = 'none';
            }

            document.getElementById('layout').classList.add('screen-shared');
        } else {
            // 모든 스트림 다시 표시
            this.state.subscribers.forEach(user => {
                document.getElementById(
                    `remoteUsers_${user.getConnectionId()}`,
                ).style.display = 'block';
            });
            document.getElementById('localUser').style.display = 'block';

            document.getElementById('layout').classList.remove('screen-shared');
        }

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

        let layoutClass = 'bounds';
        const totalElements =
            this.state.subscribers.length + (localUser ? 1 : 0);
        if (totalElements === 1) {
            layoutClass += ' one-element';
        } else if (totalElements === 2) {
            layoutClass += ' two-elements';
        } else if (totalElements === 3) {
            layoutClass += ' three-elements';
        } else if (totalElements === 4) {
            layoutClass += ' four-elements';
        } else if (totalElements > 4) {
            layoutClass += ' multiple-elements';
        }

        const isScreenShared =
            this.state.subscribers.some(user => user.isScreenShareActive()) ||
            (localUser && localUser.isScreenShareActive());

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
                        sessionStatus={this.state.sessionStatus}
                    />
                    {/* <div id="layout" className="bounds"> */}
                    <div id="layout" className={layoutClass}>
                        {localUser !== undefined &&
                            localUser.getStreamManager() !== undefined && (
                                <div
                                    className="OT_root OT_publisher custom-class"
                                    id="localUser"
                                >
                                    <StreamComponent user={localUser} />
                                    {localUser.isScreenShareActive() && (
                                        <div className="screen-share-text">
                                            <div className="screen-share-icon">
                                                <img
                                                    src="/screen-share-icon.png"
                                                    alt="Screen sharing"
                                                />
                                            </div>
                                            화면 공유중
                                        </div>
                                    )}
                                </div>
                            )}
                        {this.state.subscribers.map((sub, i) => (
                            <div
                                key={i}
                                // className="OT_root OT_publisher custom-class"
                                className={`OT_root OT_publisher custom-class ${sub.isScreenShareActive() ? 'screen-sharing' : ''}`}
                                // id="remoteUsers"
                                id={`remoteUsers_${sub.getConnectionId()}`}
                            >
                                <StreamComponent
                                    user={sub}
                                    streamId={sub.streamManager.stream.streamId}
                                />

                                {sub.isScreenShareActive() && (
                                    <div className="screen-share-text">
                                        <div className="screen-share-icon">
                                            <img
                                                src="/screen-share-icon.png"
                                                alt="Screen sharing"
                                            />
                                        </div>
                                        화면 공유중
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {localUser !== undefined &&
                        localUser.getStreamManager() !== undefined && (
                            <div
                                // className="OT_root OT_publisher custom-class"
                                className="chatComponentWrapper"
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
            );
        }

        return (
            <div className="container" id="container">
                <div id="layout" className="bounds">
                    <div className="beforeEnterSession">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{
                                display: 'block',
                                width: '80px',
                            }}
                        />
                        {this.state.sessionStatus === 'mentee' && (
                            <div className="meeting-info">
                                진행 중인 회의가 없습니다.
                            </div>
                        )}
                        {this.state.sessionStatus === 'mentor' && (
                            <>
                                <OutlinedInput
                                    type="text"
                                    className="sessionNameInput"
                                    onChange={e =>
                                        this.setState({
                                            mySessionId: e.target.value,
                                        })
                                    }
                                    onKeyPress={e => {
                                        if (
                                            e.key === 'Enter' &&
                                            this.state.mySessionId !== null
                                        ) {
                                            this.joinSession();
                                        }
                                    }}
                                    placeholder="회의실 이름을 '영어로' 입력해주세요."
                                    sx={{
                                        fontFamily: 'Chosungu',
                                    }}
                                />
                                <Button
                                    onClick={this.joinSession}
                                    disabled={!this.state.mySessionId}
                                    sx={{
                                        backgroundColor: '#0B4619',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#416D19', // 호버 시 배경색
                                            color: '#ffffff', // 호버 시 텍스트 색상
                                        },
                                        '&.Mui-disabled': {
                                            backgroundColor: '#416D19', // 비활성화 시 배경색
                                            color: '#a9a9a9', // 비활성화 시 텍스트 색상
                                        },
                                        padding: '10px',
                                        fontSize: '16px',
                                        fontFamily: 'Chosungu',
                                    }}
                                >
                                    회의실 생성
                                </Button>
                            </>
                        )}
                        {this.state.sessionStatus === 'exists' && (
                            <>
                                <OutlinedInput
                                    readOnly
                                    type="text"
                                    className="sessionNameInput"
                                    value={mySessionId}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            this.joinSession();
                                        }
                                    }}
                                    sx={{
                                        fontFamily: 'Chosungu',
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
                                        fontSize: '16px',
                                        fontFamily: 'Chosungu',
                                    }}
                                >
                                    회의실 입장
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    async getToken() {
        const sessionId = await createSession(
            this.props.userToken,
            this.state.mySessionId,
        );
        return await createConnection(this.props.userToken, sessionId);
    }
}
export default VideoRoomComponent;
