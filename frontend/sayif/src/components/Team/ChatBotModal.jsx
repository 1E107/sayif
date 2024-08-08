import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    IconButton,
    Modal,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';
import ReactMarkdown from 'react-markdown';
import '../../styles/fonts.css';
import remarkGfm from 'remark-gfm'; // GitHub 스타일 마크다운 플러그인

const ChatbotModal = ({ open, handleClose }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            text: '안녕하세요! AI 챗봇 새잎 클로버입니다. 무엇을 도와드릴까요?',
            sender: 'bot',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // 메시지 영역의 참조를 위한 ref
    const messagesEndRef = useRef(null);
    const textFieldRef = useRef(null); // TextField에 대한 참조 추가

    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert('메시지를 입력해 주세요!');
            return;
        }

        // 사용자 메시지를 대화에 추가
        setMessages(prevMessages => [
            ...prevMessages,
            { text: message, sender: 'user' },
        ]);
        setMessage('');
        setIsLoading(true); // 로딩 상태 시작

        // 로딩 중 메시지를 미리 추가하여 로딩 바를 표시
        setMessages(prevMessages => [
            ...prevMessages,
            { text: '답변 작성 중...', sender: 'bot', loading: true },
        ]);

        try {
            // API 요청을 보낼 URL
            const url = `${API_BASE_URL}/chatgpt`;

            // API 요청에 필요한 데이터
            const requestData = {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a programming expert and a teacher who teaches programming knowledge to beginners. You must answer kindly and in a way that is easy for students to understand. And please answer in Korean',
                    },
                    { role: 'user', content: message },
                ],
            };

            // API 요청
            const response = await axios.post(url, requestData, {
                headers: { 'Content-Type': 'application/json' },
            });

            // 응답 데이터에서 챗봇의 응답을 추출
            const botMessage = response.data.choices[0].message.content;

            // 새로운 메시지 배열을 생성: 가장 마지막 메시지 삭제하고 새로운 메시지 추가
            setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages.pop(); // 마지막 메시지 삭제
                newMessages.push({ text: botMessage, sender: 'bot' }); // 새로운 메시지 추가
                return newMessages;
            });
        } catch (error) {
            console.error('API 요청 오류:', error);
            // 오류 발생 시 챗봇의 응답에 오류 메시지 추가
            setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages.pop(); // 마지막 메시지 삭제
                newMessages.push({
                    text: '오류가 발생했습니다. 다시 시도해 주세요.',
                    sender: 'bot',
                }); // 오류 메시지 추가
                return newMessages;
            });
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !isLoading) {
            if (e.shiftKey) {
                // Shift+Enter일 때 한 줄 띄우기
                e.preventDefault(); // 기본 Enter 동작 방지
                setMessage(prev => prev + '\n'); // 줄 바꿈 추가
            } else {
                e.preventDefault(); // 기본 Enter 동작 방지
                handleSendMessage();
            }
        }
    };

    // 메시지 목록이 업데이트될 때마다 스크롤을 최신 메시지로 이동
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const insertMarkdown = (syntax, wrap = false) => {
        const textField = textFieldRef.current;
        const start = textField.selectionStart;
        const end = textField.selectionEnd;
        const selectedText = message.slice(start, end);
        let newText;

        if (wrap) {
            newText =
                message.slice(0, start) +
                syntax +
                selectedText +
                syntax +
                message.slice(end);
        } else {
            newText =
                message.slice(0, start) +
                syntax +
                selectedText +
                message.slice(end);
        }

        setMessage(newText);
        setTimeout(() => {
            textField.focus();
            textField.setSelectionRange(
                start + syntax.length,
                end + syntax.length,
            );
        }, 0);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                fontFamily: 'ChosunGu',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)', // 배경 흐리게 하기
            }}
        >
            <Box
                sx={{
                    maxWidth: 600,
                    width: '100%',
                    height: '80%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        backgroundColor: '#0B4619',
                        color: 'white',
                        fontFamily: 'ChosunGu',
                        p: 2,
                        borderRadius: '10px 10px 0 0',
                        textAlign: 'center',
                    }}
                >
                    새잎 클로버
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column', // 수직 방향으로 배치
                        p: 2,
                        gap: 1,
                    }}
                >
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent:
                                    msg.sender === 'user'
                                        ? 'flex-end'
                                        : 'flex-start',
                                mb: 2,
                                lineHeight: '140%',
                                position: 'relative',
                                alignItems: 'flex-start', // 상단 정렬
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column', // 수직 방향으로 내용 배치
                                    alignItems: 'center', // 가운데 정렬
                                    bgcolor:
                                        msg.sender === 'user'
                                            ? '#0B4619'
                                            : '#FFFFFF',
                                    color:
                                        msg.sender === 'user'
                                            ? 'white'
                                            : 'black',
                                    p: 2,
                                    borderRadius: 2,
                                    maxWidth: '70%',
                                    wordBreak: 'break-word',
                                    position: 'relative',
                                    boxShadow: 1,
                                    // 마크다운 스타일 적용
                                    '& p': {
                                        margin: 0,
                                        padding: 0,
                                    },
                                    '& ul': {
                                        paddingLeft: '20px',
                                    },
                                    '& a': {
                                        color: '#1e90ff',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                <ReactMarkdown
                                    children={msg.text}
                                    remarkPlugins={[remarkGfm]} // GitHub 스타일 마크다운 지원
                                />
                                {msg.loading && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        {/* <CircularProgress size={20} /> */}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                    {/* 스크롤 위치를 최신 메시지로 이동시키기 위한 div */}
                    <div ref={messagesEndRef} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="메시지를 입력하세요."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        sx={{ mr: 2, fontFamily: 'ChosunGu' }}
                        multiline
                        inputRef={textFieldRef} // TextField에 대한 참조 설정
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip title="굵은 글씨">
                            <span>
                                <IconButton
                                    onClick={() => insertMarkdown('**', true)}
                                >
                                    <FormatBoldIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="기울임 글씨">
                            <span>
                                <IconButton
                                    onClick={() => insertMarkdown('*', true)}
                                >
                                    <FormatItalicIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="코드">
                            <span>
                                <IconButton
                                    onClick={() => insertMarkdown('`', true)}
                                >
                                    <CodeIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="링크">
                            <span>
                                <IconButton
                                    onClick={() =>
                                        insertMarkdown(
                                            '[링크](http://example.com)',
                                            false,
                                        )
                                    }
                                >
                                    <LinkIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="인용문">
                            <span>
                                <IconButton
                                    onClick={() => insertMarkdown('> ', false)}
                                >
                                    <FormatQuoteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="전송">
                            <span>
                                <IconButton
                                    color="primary"
                                    onClick={handleSendMessage}
                                    disabled={isLoading} // 로딩 중일 때 비활성화
                                >
                                    <SendIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChatbotModal;
