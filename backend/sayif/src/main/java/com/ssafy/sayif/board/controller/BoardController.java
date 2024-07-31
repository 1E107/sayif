package com.ssafy.sayif.board.controller;

import com.ssafy.sayif.board.dto.ModifyPostRequestDto;
import com.ssafy.sayif.board.dto.WritePostRequestDto;
import com.ssafy.sayif.board.entity.BoardType;
import com.ssafy.sayif.board.service.BoardService;
import com.ssafy.sayif.common.exception.ImageStorageException;
import com.ssafy.sayif.common.service.ImageService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    private final ImageService imageService;
    private final String bucketName = "board-images";

    @PostMapping
    public ResponseEntity<?> writePost(@RequestPart("post") WritePostRequestDto dto,
        @RequestPart("file") MultipartFile file) {
        try {
            byte[] imageContent = file.getBytes();
            String filename = imageService.saveImageToMinio(imageContent, bucketName);

            if (filename == null) {
                throw new ImageStorageException("Failed to save image.");
            }

            // 이미지 URL을 얻는 로직 (예: Minio URL 형식에 따라 설정)
            dto.setFile(filename);

            // 여기서 writePostRequestDto를 서비스로 전달하여 저장 로직을 수행할 수 있습니다.
            ResponseEntity.ok(boardService.writePost(dto));
            return ResponseEntity.ok("Post created successfully with image");
        } catch (IOException e) {
            return ResponseEntity.ok("Failed to create post: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyPost(@PathVariable("id") int id,
        @RequestBody ModifyPostRequestDto dto) {
        return ResponseEntity.ok(boardService.modifyPost(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removePost(@PathVariable("id") int id) {
        if (boardService.removePost(id)) {
            return ResponseEntity.ok("삭제가 성공적으로 되었습니다.");
        } else {
            return ResponseEntity.ok("삭제가 실패 했습니다.");
        }
    }

    @GetMapping("/{type}/{page}/{size}")
    public ResponseEntity<?> getPostList(@PathVariable("type") BoardType type,
        @PathVariable("page") int page,
        @PathVariable("size") int size) {
        return ResponseEntity.ok(boardService.getPostList(type, page, size));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getPostDetail(@PathVariable("id") int id) {
        return ResponseEntity.ok(boardService.getPostDetail(id));
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        String bucketName = "board-images";
        try {
            byte[] imageData = imageService.downloadImage(filename, bucketName);
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
