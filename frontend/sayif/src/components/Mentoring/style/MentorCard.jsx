import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagList from '../TagList';
import '../../../styles/fonts.css';

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
    align-items: flex-start; /* 중앙 정렬에서 좌측 정렬로 변경 */
    padding-left: 20px; /* 좌측 여백 추가 */
    margin-left: 5%;
`;

const Name = styled.h3`
    margin: 0 0 5px 0;
    font-size: 1.2em;
`;

const Cohort = styled.p`
    margin: 0;
`;

const Description = styled.p`
    border-radius: 10px;
    padding: 15px;
    margin: 15px 0;
    font-size: 1.3em;
    font-weight: bold;
    color: #0b4619;
    line-height: 1.5; /* 줄간 간격 설정 */
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
    font-family: 'ChosunGu', sans-serif; /* 폰트 적용 */
    position: relative; /* 부모 컴포넌트를 상대 위치로 설정 */
`;

const ContentContainer = styled.div`
    flex: 1; /* 공간을 채우도록 설정 */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
`;

const MentorCard = ({
    seq,
    name,
    nickname,
    intro,
    track,
    profileImg,
    regCode,
    tags,
}) => {
    return (
        <Card>
            <Header>
                <Info>
                    <Name>{nickname}</Name>
                    <Cohort>
                        {regCode}_{seq}기_{track}
                    </Cohort>
                </Info>
                <Avatar src={profileImg} alt={`${name} avatar`} />
            </Header>
            <ContentContainer>
                <Description>{intro}</Description>
                <TagList tags={tags} />
            </ContentContainer>
            <MessageLink href="#">📩 쪽지 보내기</MessageLink>
        </Card>
    );
};

MentorCard.propTypes = {
    seq: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    regCode: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorCard;
