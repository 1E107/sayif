import { getTeamExperience, updateTeamExperience } from './TeamApi';

export const API_BASE_URL = 'https://i11e107.p.ssafy.io/api';
// export const API_BASE_URL = 'http://localhost:8080/api';

// 식물 경험치 증가 : 상한선 - point점 이하일 때, point점 증가
export const acquireExperience = async (token, member, point) => {
    const experienceResponse = await getTeamExperience(member.teamId, token);

    if (experienceResponse.data.point <= 500 - point) {
        await updateTeamExperience(member.teamId, token, point);
    }
};
