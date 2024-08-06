import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@mui/icons-material/MicOff';
import VideocamOff from '@mui/icons-material/VideocamOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
import IconButton from '@mui/material/IconButton';

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { mutedSound: false, isFormValid: true };
        this.toggleSound = this.toggleSound.bind(this);
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    render() {
        return (
            <div className="OT_widget-container">
                <div className="pointer nickname">
                        <div>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""></span>}
                        </div>
                </div>
                {this.props.user !== undefined &&
                this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent
                            user={this.props.user}
                            mutedSound={this.state.mutedSound}
                        />
                        <div id="statusIcons">
                            {!this.props.user.isVideoActive() ? (
                                <div id="camIcon">
                                    <VideocamOff id="statusCam" />
                                </div>
                            ) : null}

                            {!this.props.user.isAudioActive() ? (
                                <div id="micIcon">
                                    <MicOff id="statusMic" />
                                </div>
                            ) : null}
                        </div>
                        <div>
                            {!this.props.user.isLocal() && (
                                <IconButton
                                    id="volumeButton"
                                    onClick={this.toggleSound}
                                >
                                    {this.state.mutedSound ? (
                                        <VolumeOff color="secondary" />
                                    ) : (
                                        <VolumeUp />
                                    )}
                                </IconButton>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
