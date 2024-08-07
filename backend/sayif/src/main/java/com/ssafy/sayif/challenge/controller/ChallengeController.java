package com.ssafy.sayif.challenge.controller;

import com.ssafy.sayif.board.dto.PostRequestDto;
import com.ssafy.sayif.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.sayif.challenge.dto.ChallengeResponseDto;
import com.ssafy.sayif.challenge.entity.Challenge;
import com.ssafy.sayif.challenge.Repository.ChallengeRepository;
import com.ssafy.sayif.challenge.service.ChallengeService;
import com.ssafy.sayif.common.exception.FileStorageException;
import com.ssafy.sayif.common.service.FileService;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Optional;


@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;
    private final FileService fileService;

    private final String bucketName = "challenge-images";

    @PostMapping("/predict")
    public Mono<ResponseEntity<Boolean>> predict(@RequestParam("challengeNum") int challengeNum, @RequestParam("file") MultipartFile file) {
        return challengeService.getPredictionAndCompare(challengeNum, file)
                .map(body -> ResponseEntity.ok(body))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).build()));
    }

    @GetMapping("/try/{teamId}")
    public ResponseEntity<?> tryChallenge(@PathVariable int teamId, @AuthenticationPrincipal UserDetails userDetails) {
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
    public ResponseEntity<?> sucessChallenge(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        if (member.getRole() != Role.Mentor) return ResponseEntity.status(400).body("권한이 없습니다.");

        boolean changed = challengeService.changeChallengeStatus(id);
        if (changed) {
            return ResponseEntity.ok("챌린지를 완료했습니다.");
        } else {
            return ResponseEntity.status(400).body("해당 챌린지는 진행 중이 아닙니다.");
        }
    }

    @GetMapping("/detail/{challengeId}")
    public ResponseEntity<?> detailChallenge(@PathVariable Long challengeId, @AuthenticationPrincipal UserDetails userDetails) {
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
    public ResponseEntity<?> uploadImage(@PathVariable Long challengeId, @RequestBody MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            // 파일이 존재하는 경우
            if (file != null && !file.isEmpty()) {
                // MultipartFile 객체에서 파일의 바이트 배열을 가져옵니다.
                byte[] fileContent = file.getBytes();

                // MultipartFile 객체에서 원본 파일 이름을 가져옵니다.
                String originalFilename = file.getOriginalFilename();

                // Minio 서버에 파일을 저장하고, 저장된 파일의 이름을 반환받습니다.
                String filename = fileService.saveFileToMinio(fileContent, bucketName, originalFilename);

                // 파일이 제대로 저장되지 않았거나, 반환된 파일 이름이 null인 경우 예외를 발생시킵니다.
                if (filename == null) {
                    throw new FileStorageException("Failed to save file.");
                }

                // 챌린지 상세 정보 저장
                challengeService.saveChallengeDetail(challengeId, filename, userDetails.getUsername());
                return ResponseEntity.ok("챌린지 상세 정보가 저장되었습니다.");
            } else {
                return ResponseEntity.status(400).body("이미지가 없습니다.");
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    @GetMapping("/image/{challengeId}")
    public ResponseEntity<?> getImage(@PathVariable Long challengeId, @AuthenticationPrincipal UserDetails userDetails) {
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
    public ResponseEntity<?> getChallenge(@PathVariable Integer teamId, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Member member = memberRepository.findByUsername(username);
        if (member.getTeam().getId() != teamId) {
            return ResponseEntity.status(400).body("해당 팀의 구성원이 아닙니다.");
        } else {
            return ResponseEntity.ok(challengeService.getChallenge(teamId));
        }

    }
}
