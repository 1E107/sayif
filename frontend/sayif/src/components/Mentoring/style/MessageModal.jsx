import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/config';
import { useSelector } from 'react-redux';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: center;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 24px;
    color: #333;
    cursor: pointer;
`;

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
`;

const TextArea = styled.textarea`
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    height: 100px;
    resize: vertical;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #0b4619;
    color: white;
    font-size: 1em;
    cursor: pointer;
    margin-top: 10px;
`;

const MessageModal = ({ isOpen, onClose, receiver }) => {
    const { token } = useSelector(state => state.member);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!title) {
            alert('제목을 입력하세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력하세요.');
            return;
        }

        console.log({
            receiver, // 멘토 ID 추가
            title,
            content,
        });

        try {
            const response = await axios.post(
                `${API_BASE_URL}/member/message`,
                {
                    receiver, // 멘토 ID 추가
                    title,
                    content,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            if (response.status === 200) {
                alert('쪽지가 전송되었습니다.');
                setTitle(''); // 입력 필드 초기화
                setContent(''); // 입력 필드 초기화
                onClose(); // 모달 닫기
            } else {
                alert('쪽지 전송에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('전송 오류:', error);
            alert('서버와의 연결에 실패했습니다. 나중에 다시 시도해 주세요.');
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>📬 멘토에게 쪽지 보내기</h2>
                <Input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextArea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <SubmitButton onClick={handleSubmit}>보내기</SubmitButton>
            </ModalContent>
        </ModalOverlay>
    );
};

MessageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    receiver: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired, // receiver prop 타입 수정
};

export default MessageModal;
