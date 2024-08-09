import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagList from '../TagList';
import '../../../styles/fonts.css';
import MessageModal from './MessageModal';

const Header = styled.div`
    background-color: #0b4619;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    padding: 5px;
    margin-right: 10%;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    margin-left: 5%;
`;

const Name = styled.h3`
    margin: 0 0 10px 0;
    font-size: 1.2em;
`;

const Cohort = styled.p`
    margin: 0;
`;

const Description = styled.p`
    border-radius: 10px;
    padding: 15px;
    margin: 0;
    font-size: 1.1em;
    font-weight: bold;
    color: #0b4619;
    line-height: 1.5;
    position: absolute;
    top: 100px;
    width: calc(100% - 40px);
    height: 100px;
    overflow: auto;
    white-space: pre-line;
`;

const TagListContainer = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const MessageLink = styled.a`
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #161616;
    text-decoration: none;
    font-size: 0.9em;
`;

const Card = styled.div`
    background-color: #e8e8cc;
    border-radius: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 400px;
    overflow: hidden;
    height: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'ChosunGu', sans-serif;
    position: relative;
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

const campus = {
    101: '부울경',
    102: '서울',
    103: '광주',
    104: '대전',
    105: '구미',
};

const MentorCard = ({
    id, // ID 추가
    seq,
    name,
    nickname,
    intro,
    track,
    profileImg,
    regCode,
    tags,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Card>
            <Header>
                <Info>
                    <Name>{nickname}</Name>
                    <Cohort>
                        {campus[regCode]}_{seq}기_{track}
                    </Cohort>
                </Info>
                <Avatar src={profileImg} alt={`${name} avatar`} />
            </Header>
            <ContentContainer>
                <Description>{intro}</Description>
                <TagListContainer>
                    <TagList tags={tags} />
                </TagListContainer>
            </ContentContainer>
            <MessageLink href="#" onClick={handleOpenModal}>
                📩 쪽지 보내기
            </MessageLink>
            <MessageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                receiver={id} // ID 전달
            />
        </Card>
    );
};

MentorCard.propTypes = {
    id: PropTypes.number.isRequired, // ID prop 타입 수정
    seq: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    regCode: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorCard;
