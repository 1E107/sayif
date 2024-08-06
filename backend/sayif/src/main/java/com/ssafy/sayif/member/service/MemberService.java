package com.ssafy.sayif.member.service;

import com.ssafy.sayif.common.exception.FileStorageException;
import com.ssafy.sayif.common.service.FileService;
import com.ssafy.sayif.member.dto.MemberInfoResponseDto;
import com.ssafy.sayif.member.dto.MemberUpdateRequestDto;
import com.ssafy.sayif.member.dto.MentoringRecordResponseDto;
import com.ssafy.sayif.member.dto.RegisterRequestDto;
import com.ssafy.sayif.member.entity.History;
import com.ssafy.sayif.member.entity.Member;
import com.ssafy.sayif.member.entity.Mentee;
import com.ssafy.sayif.member.entity.Mentor;
import com.ssafy.sayif.member.entity.Role;
import com.ssafy.sayif.member.entity.Status;
import com.ssafy.sayif.member.repository.HistoryRepository;
import com.ssafy.sayif.member.repository.MemberRepository;
import com.ssafy.sayif.member.repository.MenteeRepository;
import com.ssafy.sayif.member.repository.MentorRepository;
import com.ssafy.sayif.member.repository.RefreshRepository;
import com.ssafy.sayif.team.entity.Team;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;
    private final HistoryRepository historyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MenteeRepository menteeRepository;
    private final MentorRepository mentorRepository;
    private final FileService fileService;

    private final String bucketName = "member-profile";

    public Boolean registerMember(RegisterRequestDto registerRequestDto, MultipartFile file) {
        String username = registerRequestDto.getUsername();
        String pwd = registerRequestDto.getPassword();

        // 중복 아이디 존재
        if (memberRepository.existsByUsername(username)) {
            return false;
        }

        String filename = saveFileAndGetFilename(file);

        Mentee mentee = Mentee.builder()
            .username(username)
            .password(bCryptPasswordEncoder.encode(pwd))
            .name(registerRequestDto.getName())
            .nickname(registerRequestDto.getNickname())
            .gender(registerRequestDto.getGender())
            .email(registerRequestDto.getEmail())
            .phone(registerRequestDto.getPhone())
            .role(Role.Mentee)
            .authFile(registerRequestDto.getAuthFile())
            .profileImg(filename == null ? "default" : filename)
            .status(Status.Pending)
            .build();
        menteeRepository.save(mentee);

        return true;
    }

    private String saveFileAndGetFilename(MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                // MultipartFile 객체에서 파일의 바이트 배열을 가져옵니다.
                byte[] fileContent = file.getBytes();

                // MultipartFile 객체에서 원본 파일 이름을 가져옵니다.
                String originalFilename = file.getOriginalFilename();

                // Minio 서버에 파일을 저장하고, 저장된 파일의 이름을 반환받습니다.
                String filename = fileService.saveFileToMinio(fileContent, bucketName,
                    originalFilename);

                // 파일이 제대로 저장되지 않았거나, 반환된 파일 이름이 null인 경우 예외를 발생시킵니다.
                if (filename == null) {
                    throw new FileStorageException("Failed to save file.");
                }
                return filename;
            } catch (IOException e) {
                throw new FileStorageException("Failed to save file.");
            }
        } else {
            return null;
        }
    }

    @Transactional
    public void updateMember(String username, MemberUpdateRequestDto updateRequestDto,
        MultipartFile file) {
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        String filename = saveFileAndGetFilename(file);

        if (member.getRole() == Role.Mentee) {
            Optional<Mentee> mentee = menteeRepository.findById(member.getId());
            if (mentee.isPresent()) {
                Mentee loginedMentee = mentee.get();
                Mentee updatedMentee = loginedMentee.toBuilder()
                    .name(updateRequestDto.getName() != null ? updateRequestDto.getName()
                        : member.getName())
                    .nickname(
                        updateRequestDto.getNickname() != null ? updateRequestDto.getNickname()
                            : member.getNickname())
                    .gender(updateRequestDto.getGender() != null ? updateRequestDto.getGender()
                        : member.getGender())
                    .email(updateRequestDto.getEmail() != null ? updateRequestDto.getEmail()
                        : member.getEmail())
                    .profileImg(filename != null ? filename : member.getProfileImg())
                    .phone(updateRequestDto.getPhone() != null ? updateRequestDto.getPhone()
                        : member.getPhone())
                    .build();
                menteeRepository.save(updatedMentee);
            }
        } else if (member.getRole() == Role.Mentor) {
            Optional<Mentor> mentor = mentorRepository.findById(member.getId());
            if (mentor.isPresent()) {
                Mentor loginedMentor = mentor.get();
                Mentor updatedMentor = loginedMentor.toBuilder()
                    .name(updateRequestDto.getName() != null ? updateRequestDto.getName()
                        : loginedMentor.getName())
                    .nickname(
                        updateRequestDto.getNickname() != null ? updateRequestDto.getNickname()
                            : loginedMentor.getNickname())
                    .gender(updateRequestDto.getGender() != null ? updateRequestDto.getGender()
                        : loginedMentor.getGender())
                    .email(updateRequestDto.getEmail() != null ? updateRequestDto.getEmail()
                        : loginedMentor.getEmail())
                    .profileImg(filename != null ? filename : member.getProfileImg())
                    .phone(updateRequestDto.getPhone() != null ? updateRequestDto.getPhone()
                        : loginedMentor.getPhone())
                    .build();
                mentorRepository.save(updatedMentor);
            }
        }


    }

    public void deleteMember(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            memberRepository.delete(member);
            deleteRefreshTokens(username);
        } else {
            throw new RuntimeException("존재하지 않는 회원입니다.");
        }
    }

    public void deleteRefreshTokens(String username) {
        System.out.println(username);
        refreshRepository.deleteAllByUsername(username);
    }


    public MemberInfoResponseDto getMemberInfo(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            return new MemberInfoResponseDto(
                member.getUsername(),
                member.getName(),
                member.getNickname(),
                member.getGender(),
                member.getPhone(),
                member.getEmail(),
                member.getProfileImg(),
                fileService.getFileUrl(member.getProfileImg(), bucketName),
                member.getRole().name(),
                member.getTeam() != null ? member.getTeam().getId() : null
            );
        } else {
            throw new RuntimeException("Member not found");
        }
    }

    public List<MentoringRecordResponseDto> getMentoringRecords(String username) {
        // 멤버 조회
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }
        // 멘토링 이력 조회
        List<History> histories = historyRepository.findByMemberId(member.getId());
        // DTO로 변환
        List<MentoringRecordResponseDto> list = new ArrayList<>();
        for (History history : histories) {
            Team team = history.getTeam();
            MentoringRecordResponseDto apply = new MentoringRecordResponseDto(
                team.getName(),
                team.getStartDate().toString(),
                team.getEndDate().toString(),
                history.getReview()
            );
            list.add(apply);
        }
        return list;

    }

    public boolean isMemberExists(String username) {
        Member member = memberRepository.findByUsername(username);
        return member != null;
    }

    public boolean updatePassword(String username, String newPwd, String newPwdCheck) {
        if (!newPwd.equals(newPwdCheck)) {
            return false; // 비밀번호와 비밀번호 확인이 일치하지 않음
        }

        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            return false; // 회원을 찾을 수 없음
        }

        // 비밀번호 암호화
        member.updatePwd(bCryptPasswordEncoder.encode(newPwd));
        memberRepository.save(member);
        return true; // 비밀번호 변경됨
    }
}
