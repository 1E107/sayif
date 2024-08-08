import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MentorCard from './style/MentorCard';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 행에 3개의 컴포넌트 배치 */
    gap: 20px;
    justify-content: center; /* 그리드 전체를 가로로 중앙 정렬 */
    padding: 20px;
`;

const MentorList = () => {
    const [mentors, setMentors] = useState([]);

    const getMentors = async () => {
        try {
            const resp = await axios.get(
                `${API_BASE_URL}/mentoring/profile/0/12`,
            );
            console.log(resp.data); // Check the structure of the response data
            setMentors(resp.data); // Assuming resp.data is an array
        } catch (error) {
            console.error('Failed to fetch mentors', error);
        }
    };

    useEffect(() => {
        getMentors();
    }, []);

    return (
        <ListContainer>
            {mentors.map((mentor, index) => (
                <MentorCard
                    key={index}
                    id={mentor.id}
                    seq={mentor.seq}
                    regCode={mentor.regCode}
                    name={mentor.name}
                    intro={mentor.intro}
                    track={mentor.track}
                    profileImg={mentor.profileImg}
                    major={mentor.major}
                    nickname={mentor.nickname}
                    tags={mentor.tags}
                />
            ))}
        </ListContainer>
    );
};

export default MentorList;
