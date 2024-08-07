package com.ssafy.sayif.challenge.service;

import com.ssafy.sayif.challenge.Repository.ChallengeDetailRepository;
import com.ssafy.sayif.challenge.Repository.ChallengeRepository;
import com.ssafy.sayif.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.sayif.challenge.dto.ChallengeResponseDto;
import com.ssafy.sayif.challenge.entity.Challenge;
import com.ssafy.sayif.challenge.entity.ChallengeDetail;
import com.ssafy.sayif.challenge.entity.ChallengeStatus;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeService {

    private final WebClient.Builder webClientBuilder;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final ChallengeDetailRepository challengeDetailRepository;

    private static final String FASTAPI_URL = "http://i11e107.p.ssafy.io:8000/predict/";

    public Mono<Boolean> getPredictionAndCompare(int challengeNum, MultipartFile file) {
        WebClient webClient = webClientBuilder.build();
        return webClient.post()
            .uri(FASTAPI_URL)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData("file", file.getResource()))
            .retrieve()
            .bodyToMono(Map.class)
            .map(response -> {
                int predictedClass = (int) response.get("predicted_class");

                // 고양이와 강아지는 애완동물로 동일하게 처리
                if ((challengeNum == 2 || challengeNum == 3) && (predictedClass == 2
                    || predictedClass == 3)) {
                    return true;
                }

                return challengeNum == predictedClass;
            });
    }

    public ChallengeResponseDto tryChallenge(int teamId) {
        List<Challenge> processChallenge = challengeRepository.findByTeamIdAndStatus(teamId,
            ChallengeStatus.Process);
        if (!processChallenge.isEmpty()) {
            // 진행중인 챌린지가 있음
            return null;
        }
        List<Challenge> beforeChallenges = challengeRepository.findByTeamIdAndStatus(teamId,
            ChallengeStatus.Before);
        if (!beforeChallenges.isEmpty()) {
            // Before 상태인 Challenge가 있을 경우
            Random random = new Random();
            Challenge challenge = beforeChallenges.get(random.nextInt(beforeChallenges.size()));
            challenge.updateStatus(ChallengeStatus.Process);
            return new ChallengeResponseDto(challenge.getId(), challenge.getChallengeList());
        }
        // 모든 첼린지를 진행했거나, 진행중이 있는 경우
        return null;
    }

    public boolean changeChallengeStatus(Long challengeNum) {
        Optional<Challenge> fingChallenge = challengeRepository.findById(challengeNum);
        if (fingChallenge.isPresent()) {
            Challenge challenge = fingChallenge.get();
            if (challenge.getStatus() == ChallengeStatus.Process) {
                challenge.updateStatus(ChallengeStatus.Success);
                return true;
            }
        }
        return false;
    }

    public List<ChallengeDetailResponseDto> getChallengeDetail(Long challengeId) {
        List<ChallengeDetail> challengeDetails = challengeDetailRepository.findByChallengeId(
            challengeId);
        if (challengeDetails.isEmpty()) {
            return null;
        }
        return challengeDetails.stream()
            .map(detail -> new ChallengeDetailResponseDto(
                detail.getChallenge().getId(),
                detail.getFile(),
                detail.getMember().getNickname(),
                detail.getCreatedAt()
            ))
            .collect(Collectors.toList());
    }

    public void saveChallengeDetail(Long challengeId, String fileUrl, String username) {
        // 챌린지 ID로 챌린지를 찾습니다.
        Optional<Challenge> challengeOptional = challengeRepository.findById(challengeId);
        if (challengeOptional.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 챌린지 ID입니다.");
        }
        Challenge challenge = challengeOptional.get();

        // 유저네임으로 회원을 찾습니다.
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        Optional<ChallengeDetail> findChallenge = challengeDetailRepository.findByChallengeIdAndMemberId(
            challengeId, member.getId());
        if (findChallenge.isPresent()) {
            ChallengeDetail challengeDetail = findChallenge.get();
            challengeDetail.updateFile(fileUrl);
        } else {
            // ChallengeDetail 객체를 생성하고 저장합니다.
            ChallengeDetail challengeDetail = ChallengeDetail.builder()
                .challenge(challenge)
                .member(member)
                .file(fileUrl)
                .build();
            challengeDetailRepository.save(challengeDetail);
        }
    }

    public String getImageUrl(Long challengeId, int memberId) {
        Optional<ChallengeDetail> findChallenge = challengeDetailRepository.findByChallengeIdAndMemberId(
            challengeId, memberId);
        if (findChallenge.isPresent()) {
            return findChallenge.get().getFile();
        } else {
            return null;
        }
    }

    public ChallengeResponseDto getChallenge(Integer teamId) {
        List<Challenge> challenges = challengeRepository.findByTeamIdAndStatus(teamId,
            ChallengeStatus.Process);
        if (!challenges.isEmpty()) {
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto();
            Challenge challenge = challenges.get(0);
            challengeResponseDto.setChallengeId(challenge.getId());
            challengeResponseDto.setChallengeList(challenge.getChallengeList());
            return challengeResponseDto;
        } else {
            throw new IllegalArgumentException("진행중인 챌린지가 없습니다.");
        }

    }
}
