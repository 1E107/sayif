import S from './style/ChatStyled';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';

function Chat() {
    const handleSendBtn = () => {};

    const ChatView = (
        <S.Container>
            <S.ChatContentWrapper>
                <S.ChatOther>
                    <S.ProfileImg src="/basic-profile.PNG" />
                    <div>
                        <S.OtherInfoText>메루</S.OtherInfoText>
                        <S.ChatContent>
                            안녕하세요 오늘도 좋은 하루 보내세요!
                        </S.ChatContent>
                        <S.OtherInfoText>12:00</S.OtherInfoText>
                    </div>
                </S.ChatOther>
                <S.ChatMy>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            컷
                        </S.MyInfoText>
                        <S.ChatContent
                            style={{
                                backgroundColor: '#116530',
                                color: 'white',
                            }}
                        >
                            네 감사합니다 저는 오늘 치킨 먹어요
                        </S.ChatContent>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            12:14
                        </S.MyInfoText>
                    </div>
                    <S.ProfileImg src="/basic-profile.PNG" />
                </S.ChatMy>
                <S.ChatOther>
                    <S.ProfileImg src="/basic-profile.PNG" />
                    <div>
                        <S.OtherInfoText>메루</S.OtherInfoText>
                        <S.ChatContent>
                            안녕하세요 오늘도 좋은 하루 보내세요!
                        </S.ChatContent>
                        <S.OtherInfoText>12:00</S.OtherInfoText>
                    </div>
                </S.ChatOther>
                <S.ChatMy>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            컷
                        </S.MyInfoText>
                        <S.ChatContent
                            style={{
                                backgroundColor: '#116530',
                                color: 'white',
                            }}
                        >
                            네 감사합니다 저는 오늘 치킨 먹어요
                        </S.ChatContent>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            12:14
                        </S.MyInfoText>
                    </div>
                    <S.ProfileImg src="/basic-profile.PNG" />
                </S.ChatMy>
                <S.ChatOther>
                    <S.ProfileImg src="/basic-profile.PNG" />
                    <div>
                        <S.OtherInfoText>메루</S.OtherInfoText>
                        <S.ChatContent>
                            안녕하세요 오늘도 좋은 하루 보내세요!
                        </S.ChatContent>
                        <S.OtherInfoText>12:00</S.OtherInfoText>
                    </div>
                </S.ChatOther>
                <S.ChatMy>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            컷
                        </S.MyInfoText>
                        <S.ChatContent
                            style={{
                                backgroundColor: '#116530',
                                color: 'white',
                            }}
                        >
                            네 감사합니다 저는 오늘 치킨 먹어요
                        </S.ChatContent>
                        <S.MyInfoText style={{ alignSelf: 'flex-end' }}>
                            12:14
                        </S.MyInfoText>
                    </div>
                    <S.ProfileImg src="/basic-profile.PNG" />
                </S.ChatMy>
            </S.ChatContentWrapper>
            <FormControl>
                <S.SendChatWrapper>
                    <OutlinedInput
                        id="component-outlined"
                        placeholder="메시지를 입력하세요."
                        style={{
                            border: '1px solid #116530CC',
                            width: '1000px',
                        }}
                    />
                    <SendIcon
                        style={{
                            color: '#116530CC',
                            marginLeft: '10px',
                            fontSize: '30px',
                        }}
                        onClick={handleSendBtn}
                    />
                </S.SendChatWrapper>
            </FormControl>
        </S.Container>
    );
    return ChatView;
}

export default Chat;
