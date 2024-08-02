package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.PostRequestDto;
import com.ssafy.sayif.board.entity.BoardType;
import com.ssafy.sayif.board.service.BoardService;
import com.ssafy.sayif.common.exception.ImageStorageException;
import com.ssafy.sayif.common.service.FileService;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    private final FileService fileService;
    private final String bucketName = "board-images";

    /**
     * 게시물을 작성합니다. 게시물과 파일을 함께 업로드할 수 있습니다.
     *
     * @param dto  게시물 작성 요청 데이터
     * @param file 업로드할 이미지 파일
     * @return 생성된 게시물에 대한 응답
     */
    @PostMapping
    public ResponseEntity<?> writePost(@RequestPart("post") PostRequestDto dto,
        @RequestPart("file") MultipartFile file) {
        try {
            saveFileAndSetFilename(dto, file);

            // 게시물 수정 서비스 호출
            ResponseEntity.ok(boardService.writePost(dto));
            return ResponseEntity.ok("Post created successfully with image");
        } catch (IOException e) {
            return ResponseEntity.ok("Failed to create post: " + e.getMessage());
        }
    }

    /**
     * 게시물을 수정합니다.
     *
     * @param id   수정할 게시물의 ID
     * @param dto  게시물 수정 요청 데이터
     * @param file 업로드할 이미지 파일
     * @return 수정된 게시물에 대한 응답
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> modifyPost(@PathVariable("id") int id,
        @RequestPart("post") PostRequestDto dto,
        @RequestPart("file") MultipartFile file) {
        try {
            saveFileAndSetFilename(dto, file);

            // 게시물 작성 서비스 호출
            ResponseEntity.ok(boardService.modifyPost(id, dto));
            return ResponseEntity.ok("Post created successfully with image");
        } catch (IOException e) {
            return ResponseEntity.ok("Failed to create post: " + e.getMessage());
        }
    }

    private void saveFileAndSetFilename(PostRequestDto dto, MultipartFile file) throws IOException {
        byte[] fileContent = file.getBytes();
        String filename = fileService.saveFileToMinio(fileContent, bucketName);

        if (filename == null) {
            throw new ImageStorageException("Failed to save file.");
        }

        // 이미지 파일 이름을 게시물 DTO에 설정
        dto.setFile(filename);
    }

    /**
     * 게시물을 삭제합니다.
     *
     * @param id 삭제할 게시물의 ID
     * @return 삭제 결과에 대한 응답
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removePost(@PathVariable("id") int id) {
        if (boardService.removePost(id)) {
            return ResponseEntity.ok("삭제가 성공적으로 되었습니다.");
        } else {
            return ResponseEntity.ok("삭제가 실패 했습니다.");
        }
    }

    /**
     * 게시물 목록을 조회합니다.
     *
     * @param type 게시물 유형
     * @param page 페이지 번호
     * @param size 페이지 당 항목 수
     * @return 게시물 목록에 대한 응답
     */
    @GetMapping("/{type}/{page}/{size}")
    public ResponseEntity<?> getPostList(@PathVariable("type") BoardType type,
        @PathVariable("page") int page,
        @PathVariable("size") int size) {
        return ResponseEntity.ok(boardService.getPostList(type, page, size));
    }

    /**
     * 게시물 상세 정보를 조회합니다.
     *
     * @param id 조회할 게시물의 ID
     * @return 게시물 상세 정보에 대한 응답
     */
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getPostDetail(@PathVariable("id") int id) {
        return ResponseEntity.ok(boardService.getPostDetail(id));
    }

    /**
     * 이미지를 다운로드하여 반환합니다.
     *
     * @param filename 다운로드할 이미지 파일 이름
     * @return 이미지 파일의 바이트 배열을 포함하는 응답
     */
    @GetMapping("/image/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        String bucketName = "board-images";
        try {
            byte[] imageData = fileService.downloadFile(filename, bucketName);
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.IMAGE_JPEG) // 필요한 경우, 적절한 MIME 타입으로 변경
                .body(imageData);
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
