import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import Videocam from '@mui/icons-material/Videocam';
import VideocamOff from '@mui/icons-material/VideocamOff';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import PictureInPicture from '@mui/icons-material/PictureInPicture';
import ScreenShare from '@mui/icons-material/ScreenShare';
import StopScreenShare from '@mui/icons-material/StopScreenShare';
import ExitToApp from '@mui/icons-material/ExitToApp';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';

import Swal from 'sweetalert2';

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }

    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    async leaveSession() {
        if (this.props.sessionStatus === 'mentor') {
            const result = await Swal.fire({
                title: '회의를 종료하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '확인',
                cancelButtonText: '취소',
            });

            if (result.isConfirmed) {
                this.props.leaveSession();
            }
        } else {
            this.props.leaveSession();
        }
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        {this.props.sessionId && (
                            <div id="titleContent">
                                <span id="session-title">{mySessionId}</span>
                            </div>
                        )}
                    </div>

                    <div className="buttonsContent">
                        <IconButton
                            color="inherit"
                            className="navButton"
                            id="navMicButton"
                            onClick={this.micStatusChanged}
                        >
                            {localUser !== undefined &&
                            localUser.isAudioActive() ? (
                                <Mic />
                            ) : (
                                <MicOff color="secondary" />
                            )}
                        </IconButton>

                        <IconButton
                            color="inherit"
                            className="navButton"
                            id="navCamButton"
                            onClick={this.camStatusChanged}
                        >
                            {localUser !== undefined &&
                            localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>

                        <IconButton
                            color="inherit"
                            className="navButton"
                            onClick={this.screenShare}
                        >
                            {localUser !== undefined &&
                            localUser.isScreenShareActive() ? (
                                <PictureInPicture />
                            ) : (
                                <ScreenShare />
                            )}
                        </IconButton>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton
                                    onClick={this.stopScreenShare}
                                    id="navScreenButton"
                                >
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )}
                        <IconButton
                            color="inherit"
                            className="navButton"
                            onClick={this.toggleFullscreen}
                        >
                            {localUser !== undefined &&
                            this.state.fullscreen ? (
                                <FullscreenExit />
                            ) : (
                                <Fullscreen />
                            )}
                        </IconButton>
                        <IconButton
                            color="secondary"
                            className="navButton"
                            onClick={this.leaveSession}
                            id="navLeaveButton"
                        >
                            <ExitToApp style={{ color: '#FFCC1D' }} />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={this.toggleChat}
                            id="navChatButton"
                        >
                            {this.props.showNotification && (
                                <div id="point" className="" />
                            )}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
