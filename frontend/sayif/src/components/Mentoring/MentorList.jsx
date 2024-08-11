import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MentorCard from './style/MentorCard';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 행에 3개의 컴포넌트 배치 */
    gap: 70px;
    justify-content: center; /* 그리드 전체를 가로로 중앙 정렬 */
    align-items: center; /* 그리드 아이템들을 상하로 중앙 정렬 */
    justify-items: center; /* 그리드 아이템들을 좌우로 중앙 정렬 */
    padding: 20px;
    max-width: 1200px; /* 컨테이너의 최대 너비 설정 */
    margin: 0 auto; /* 좌우 마진을 자동으로 설정하여 중앙 정렬 */
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
`;

const Select = styled.select`
    font-family: 'ChosunGu', sans-serif;
    margin-top: 30px;
    margin-left: 40px;
    font-size: 16px;
    border-radius: 25px; /* 둥근 모서리 */
    background-color: #ffffff; /* 배경색 흰색 */
    outline: none;
    appearance: none; /* 기본 드롭다운 화살표 제거 */
    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="%23000000" d="M12 6l-4 4-4-4z"/></svg>'); /* 검은색 드롭다운 화살표 */
    background-repeat: no-repeat;
    background-position: right 15px center; /* 화살표 위치 */
    background-size: 20px;
    padding: 10px 40px 10px 20px; /* 화살표가 들어갈 자리 확보 */
    font-weight: bold;
    border: 2px solid #116530; /* 테두리 색상 초록색 */
`;

const Option = styled.option`
    font-family: 'ChosunGu', sans-serif; /* 원하는 폰트로 설정 */
    font-size: 18px; /* 글씨 크기 증가 */
    padding: 10px 20px; /* 패딩을 추가하여 크기 증가 */
    color: #333; /* 옵션 텍스트 색상 */
    background-color: #ffffff; /* 옵션 배경색 흰색 */
    border: 1px solid #ccc; /* 각 옵션 항목에 테두리 추가 */
    margin: 5px 0; /* 옵션 간의 간격 추가 */
`;

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(''); // 선택된 트랙 상태

    const getMentors = async () => {
        try {
            const resp = await axios.get(
                `${API_BASE_URL}/mentoring/profile/0/12`,
            );
            console.log(resp.data); // 응답 데이터 구조 확인
            setMentors(resp.data); // resp.data가 배열이라고 가정
        } catch (error) {
            console.error('멘토 정보를 불러오는데 실패했습니다', error);
        }
    };

    useEffect(() => {
        getMentors();
    }, []);

    // track별로 필터링
    const filteredMentors = selectedTrack
        ? mentors.filter(mentor => mentor.track === selectedTrack)
        : mentors;

    return (
        <>
            <FilterContainer>
                <Select
                    value={selectedTrack}
                    onChange={e => setSelectedTrack(e.target.value)}
                >
                    <Option value="">모든 트랙</Option>
                    <Option value="Web">웹</Option>
                    <Option value="Mobile">모바일</Option>
                    <Option value="Embedded">임베디드</Option>
                    <Option value="Data">데이터</Option>
                    <Option value="Robot">로봇</Option>
                    {/* 필요한 경우 옵션 추가 */}
                </Select>
            </FilterContainer>
            <ListContainer>
                {filteredMentors.map((mentor, index) => (
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
        </>
    );
};

export default MentorList;
