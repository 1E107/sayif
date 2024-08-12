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
  font-family: 'ChosunGu', sans-serif;
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
  font-family: 'ChosunGu', sans-serif;
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
  font-family: 'ChosunGu', sans-serif;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
  font-family: 'ChosunGu', sans-serif;
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
  box-sizing: border-box;
  font-family: 'ChosunGu', sans-serif;
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
  font-family: 'ChosunGu', sans-serif;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9em;
  margin: 0;
  padding: 0 20px;
  text-align: left;
  font-family: 'ChosunGu', sans-serif;
`;

const MessageModal = ({ isOpen, onClose, receiver }) => {
    const { token } = useSelector(state => state.member);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title || !content) {
            setError('제목과 내용을 모두 입력하세요.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            console.log({
                receiver,
                title,
                content,
            });

            const response = await axios.post(
                `${API_BASE_URL}/member/message`,
                {
                    receiver,
                    title,
                    content,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            if (response.status === 200) {
                alert('쪽지가 전송되었습니다.');
                setTitle('');
                setContent('');
                onClose();
            } else {
                alert('쪽지 전송에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('전송 오류:', error);
            alert('서버와의 연결에 실패했습니다. 나중에 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>📬 멘토에게 쪽지 보내기</h2>
                {error && <ErrorText>{error}</ErrorText>}
                <Input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    aria-required="true"
                />
                <TextArea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    aria-required="true"
                />
                <SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? '전송 중...' : '보내기'}
                </SubmitButton>
            </ModalContent>
        </ModalOverlay>
    );
};

MessageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    receiver: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default MessageModal;
