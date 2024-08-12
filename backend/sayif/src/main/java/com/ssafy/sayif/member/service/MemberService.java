package com.ssafy.sayif.member.service;

import com.ssafy.sayif.common.service.S3Service;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;
    private final HistoryRepository historyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MenteeRepository menteeRepository;
    private final MentorRepository mentorRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket-names.member}")
    private String bucketName;


    public Boolean registerMember(RegisterRequestDto registerRequestDto, MultipartFile file) {
        String username = registerRequestDto.getUsername();
        String pwd = registerRequestDto.getPassword();

        // 중복 아이디 존재
        if (memberRepository.existsByUsername(username)) {
            return false;
        }

        String fileUrl;
        if (file != null) {
            fileUrl = s3Service.upload(file, bucketName);
        } else {
            fileUrl = s3Service.getUrl("default.jpg", bucketName);
        }

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
            .profileImg(fileUrl)
            .status(Status.Pending)
            .build();
        menteeRepository.save(mentee);

        return true;
    }

    @Transactional
    public void updateMember(String username, MemberUpdateRequestDto updateRequestDto,
        MultipartFile file) {
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        final String oldFileUrl = member.getProfileImg(); // 기존 이미지 URL 저장
        String newFileUrl = oldFileUrl; // 새로운 파일 URL을 초기화

        // 파일이 존재하면 업로드하고 새로운 파일 URL로 변경
        if (file != null && !file.isEmpty()) {
            newFileUrl = s3Service.upload(file, bucketName);
        }

        // 공통 필드 업데이트를 위한 빌더
        Member.MemberBuilder<?, ?> memberBuilder = member.toBuilder()
            .name(
                updateRequestDto.getName() != null ? updateRequestDto.getName() : member.getName())
            .nickname(updateRequestDto.getNickname() != null ? updateRequestDto.getNickname()
                : member.getNickname())
            .gender(updateRequestDto.getGender() != null ? updateRequestDto.getGender()
                : member.getGender())
            .email(updateRequestDto.getEmail() != null ? updateRequestDto.getEmail()
                : member.getEmail())
            .profileImg(newFileUrl)
            .phone(updateRequestDto.getPhone() != null ? updateRequestDto.getPhone()
                : member.getPhone());

        Member updatedMember = memberBuilder.build();

        final String finalNewFileUrl = newFileUrl; // effectively final로 만들기 위해 추가

        if (member.getRole() == Role.Mentee) {
            Optional<Mentee> mentee = menteeRepository.findById(member.getId());
            mentee.ifPresent(loginedMentee -> {
                Mentee updatedMentee = loginedMentee.toBuilder()
                    .name(updateRequestDto.getName() != null ? updateRequestDto.getName()
                        : loginedMentee.getName())
                    .nickname(
                        updateRequestDto.getNickname() != null ? updateRequestDto.getNickname()
                            : loginedMentee.getNickname())
                    .gender(updateRequestDto.getGender() != null ? updateRequestDto.getGender()
                        : loginedMentee.getGender())
                    .email(updateRequestDto.getEmail() != null ? updateRequestDto.getEmail()
                        : loginedMentee.getEmail())
                    .profileImg(finalNewFileUrl)
                    .phone(updateRequestDto.getPhone() != null ? updateRequestDto.getPhone()
                        : loginedMentee.getPhone())
                    .build();
                menteeRepository.save(updatedMentee);
            });
        } else if (member.getRole() == Role.Mentor) {
            Optional<Mentor> mentor = mentorRepository.findById(member.getId());
            mentor.ifPresent(loginedMentor -> {
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
                    .profileImg(finalNewFileUrl)
                    .phone(updateRequestDto.getPhone() != null ? updateRequestDto.getPhone()
                        : loginedMentor.getPhone())
                    .build();
                mentorRepository.save(updatedMentor);
            });
        }

        // member 엔티티의 profileImg 필드를 업데이트
        memberRepository.save(updatedMember);

        // 새로운 파일 업로드 후, 기존 파일이 default.jpg가 아니고 기존 파일과 새로운 파일이 다를 때만 삭제
        if (!finalNewFileUrl.equals(oldFileUrl) && !s3Service.getKeyFromFileAddress(oldFileUrl)
            .equals("default.jpg") && s3Service.checkIfObjectExists(oldFileUrl, bucketName)) {
            s3Service.deleteFileFromS3(oldFileUrl, bucketName);
        }


    }


    public void deleteMember(String username) {
        Member member = memberRepository.findByUsername(username);
        if (member != null) {
            memberRepository.delete(member);
            s3Service.deleteFileFromS3(member.getProfileImg(), bucketName);
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

    public Member getMemberByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    public boolean checkDuplicateId(String username) {
        return memberRepository.findByUsername(username) != null;
    }
}
