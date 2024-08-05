import React from 'react';
import styled from 'styled-components';
import MentorCard from './style/MentorCard';

const mentors = [
    {
        name: 'Meru',
        cohort: '부울경_1기_웹',
        description:
            '"코딩"이 어렵게 느껴지신다구요? 비전공자의 실제 경험에서 나온 쉽게 코딩을 배우는 방법을 알려드릴게요!',
        mbti: 'ISTP',
        tags: ['열정', '긍정', '친근'],
    },
    {
        name: 'Oh, bok',
        cohort: '부울경_1기_웹',
        description:
            '다양한 프로젝트 경험을 한 전문가와 함께하는 코딩 입문하기 ! 기초 원리부터 차근차근 알려드릴게요 ><',
        mbti: 'ISFJ',
        tags: [],
    },
    {
        name: 'Cut',
        cohort: '부울경_1기_웹',
        description:
            '따뜻한 멘토와 함께하는 코딩 입문, 궁금한 점은 언제든지 물어보세요. 여러분의 질문에 항상 친절하게 답해드립니다.',
        mbti: 'ESTJ',
        tags: ['리더형', '아는형', '테스트형'],
    },
    {
        name: 'Bang',
        cohort: '부울경_1기_웹',
        description:
            '친절하고 인내심 많은 멘토와 함께하는 코딩 여행, 학습 중에 어려움을 느끼실 때도 함께 극복하며 끝까지 함께합니다.',
        mbti: 'ESTJ',
        tags: ['열정', '긍정', '친근'],
    },
    {
        name: 'Sora',
        cohort: '부울경_1기_웹',
        description:
            '공감과 소통을 중시하는 멘토와 함께 즐겁게 배우는 코딩, 누구나 쉽게 따라올 수 있도록 재미있고 이해하기 쉽게 설명해드립니다.',
        mbti: 'ISFJ',
        tags: [],
    },
    {
        name: 'Go doong',
        cohort: '부울경_1기_웹',
        description:
            '열정과 배려심 가득한 멘토와 함께하는 코딩 학습, 여러분의 첫걸음을 진심으로 응원하며 차근차근 도와드립니다.',
        mbti: 'ESTJ',
        tags: ['리더형', '아는형', '테스트형'],
    },
];

const MentorListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
`;

const MentorList = () => {
    return (
        <MentorListContainer>
            {mentors.map((mentor, index) => (
                <MentorCard
                    key={index}
                    name={mentor.name}
                    cohort={mentor.cohort}
                    description={mentor.description}
                    mbti={mentor.mbti}
                    tags={mentor.tags}
                />
            ))}
        </MentorListContainer>
    );
};

export default MentorList;
