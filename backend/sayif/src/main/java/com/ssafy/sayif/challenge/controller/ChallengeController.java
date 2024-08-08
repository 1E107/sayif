package com.ssafy.sayif.challenge.controller;

import com.ssafy.sayif.challenge.Repository.ChallengeRepository;
import com.ssafy.sayif.challenge.dto.ChallengeResponseDto;
import com.ssafy.sayif.challenge.entity.Challenge;
import com.ssafy.sayif.challenge.service.ChallengeService;
import com.ssafy.sayif.common.exception.FileStorageException;
import com.ssafy.sayif.common.service.S3Service;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.MemberRepository;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    private final S3Service s3Service;

    @PostMapping("/predict")
    public Mono<ResponseEntity<Boolean>> predict(@RequestParam("challengeNum") int challengeNum,
        @RequestParam("file") MultipartFile file) {
        return challengeService.getPredictionAndCompare(challengeNum, file)
            .map(ResponseEntity::ok)
            .onErrorResume(e -> Mono.just(ResponseEntity.status(500).build()));
    }

    @GetMapping("/try/{teamId}")
    public ResponseEntity<?> tryChallenge(@PathVariable int teamId,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        if (member.getTeam().getId() != teamId) {
            return ResponseEntity.status(400).body("해당 팀의 구성원이 아닙니다.");
        }
        ChallengeResponseDto challengeResponseDto = challengeService.tryChallenge(teamId);
        if (challengeResponseDto == null) {
            return ResponseEntity.status(400).body("진행 중인 챌린지가 있습니다.");
        }
        return ResponseEntity.ok(challengeResponseDto);
    }

    @PutMapping("/success/{id}")
    public ResponseEntity<?> successChallenge(@PathVariable Long id,
        @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        if (member.getRole() != Role.Mentor) {
            return ResponseEntity.status(400).body("권한이 없습니다.");
        }

        boolean changed = challengeService.changeChallengeStatus(id);
        if (changed) {
            return ResponseEntity.ok("챌린지를 완료했습니다.");
        } else {
            return ResponseEntity.status(400).body("해당 챌린지는 진행 중이 아닙니다.");
        }
    }

    @GetMapping("/detail/{challengeId}")
    public ResponseEntity<?> detailChallenge(@PathVariable Long challengeId,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        Optional<Challenge> findChallenge = challengeRepository.findById(challengeId);
        if (findChallenge.isPresent()) {
            Challenge challenge = findChallenge.get();
            if (member.getTeam() != challenge.getTeam()) {
                return ResponseEntity.status(400).body("해당 팀의 구성원이 아닙니다.");
            } else {
                return ResponseEntity.ok(challengeService.getChallengeDetail(challengeId));
            }

        } else {
            return ResponseEntity.status(400).body("존재하지 않는 챌린지 ID입니다.");
        }
    }

    @PostMapping("/{challengeId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long challengeId,
        @RequestBody MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) {
        // 파일이 존재하는 경우
        if (file != null && !file.isEmpty()) {
            // S3 버킷에 파일 저장
            String fileUrl = s3Service.upload(file);

            // 파일이 제대로 저장되지 않았거나, 반환된 파일 이름이 null인 경우 예외를 발생시킵니다.
            if (fileUrl == null) {
                throw new FileStorageException("Failed to save file.");
            }

            // 챌린지 상세 정보 저장
            challengeService.saveChallengeDetail(challengeId, fileUrl,
                userDetails.getUsername());
            return ResponseEntity.ok("챌린지 상세 정보가 저장되었습니다.");
        } else {
            return ResponseEntity.status(400).body("이미지가 없습니다.");
        }

    }

    @GetMapping("/image/{challengeId}")
    public ResponseEntity<?> getImage(@PathVariable Long challengeId,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        Optional<Challenge> findChallenge = challengeRepository.findById(challengeId);
        if (findChallenge.isPresent()) {
            Challenge challenge = findChallenge.get();
            if (member.getTeam() != challenge.getTeam()) {
                return ResponseEntity.status(400).body("해당 팀의 구성원이 아닙니다.");
            } else {
                String result = challengeService.getImageUrl(challengeId, member.getId());
                if (result != null) {
                    return ResponseEntity.ok(result);
                }
                return ResponseEntity.status(400).body("등록한 이미지가 없습니다.");
            }

        } else {
            return ResponseEntity.status(400).body("존재하지 않는 챌린지 ID입니다.");
        }
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getChallenge(@PathVariable Integer teamId,
        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        if (!Objects.equals(member.getTeam().getId(), teamId)) {
            return ResponseEntity.status(400).body("해당 팀의 구성원이 아닙니다.");
        } else {
            return ResponseEntity.ok(challengeService.getChallenge(teamId));
        }

    }
}
