package com.ssafy.sayif.common.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.ssafy.sayif.common.exception.ErrorCode;
import com.ssafy.sayif.common.exception.S3Exception;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Service {

    private final AmazonS3 amazonS3; // AmazonS3 클라이언트 객체
    private final Tika tika = new Tika(); // Tika 객체를 사용하여 파일의 ContentType을 감지

    /**
     * 파일을 S3 버킷에 업로드
     *
     * @param file 업로드할 파일
     * @return 업로드된 파일의 URL
     */
    public String upload(MultipartFile file, String bucketName) {
        if (file.isEmpty() || Objects.isNull(file.getOriginalFilename())) {
            return null;
        }
        return this.uploadFile(file, bucketName);
    }

    /**
     * 파일을 S3 버킷에 업로드
     *
     * @param file 업로드할 파일
     * @return 업로드된 파일의 URL
     */
    private String uploadFile(MultipartFile file, String bucketName) {
        try {
            return this.uploadFileToS3(file, bucketName);
        } catch (IOException e) {
            throw new S3Exception(ErrorCode.IO_EXCEPTION_ON_IMAGE_UPLOAD);
        }
    }

    /**
     * 파일을 S3 버킷에 업로드하는 로직
     *
     * @param file 업로드할 파일
     * @return 업로드된 파일의 URL
     * @throws IOException 파일 처리 중 발생할 수 있는 예외
     */
    private String uploadFileToS3(MultipartFile file, String bucketName) throws IOException {
        String originalFilename = file.getOriginalFilename(); // 원본 파일명
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            originalFilename = originalFilename.substring(0,
                originalFilename.lastIndexOf(".")); // 확장자 제거
        }

        // 파일명을 URL-safe하게 인코딩
        String encodedFilename = URLEncoder.encode(Objects.requireNonNull(originalFilename),
            StandardCharsets.UTF_8);

        // S3에 저장될 파일명 생성 (랜덤 UUID + 인코딩된 파일명 + 확장자)
        String s3FileName = UUID.randomUUID() + "_" + encodedFilename + extension;

        byte[] bytes;
        try (InputStream is = file.getInputStream()) {
            bytes = IOUtils.toByteArray(is); // InputStream을 byte 배열로 변환
        } catch (IOException e) {
            log.error("Error converting InputStream to byte array: ", e);
            throw e;
        }

        // 파일의 ContentType을 자동으로 설정
        String contentType = tika.detect(bytes);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        // S3 업로드를 위한 메타데이터 설정
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);
        metadata.setContentLength(bytes.length);

        try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes)) {
            // S3에 파일 업로드 요청 설정
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName,
                byteArrayInputStream, metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead); // Public Read 권한 설정;
            amazonS3.putObject(putObjectRequest); // 파일을 S3에 업로드
        } catch (Exception e) {
            log.error("Error occurred while uploading to S3: ", e);
            throw new S3Exception(ErrorCode.PUT_OBJECT_EXCEPTION);
        }

        // 업로드된 파일의 URL 반환
        return amazonS3.getUrl(bucketName, s3FileName).toString();
    }

    public String getUrl(String fileName, String bucketName) {
        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    /**
     * S3 버킷에서 파일 삭제
     *
     * @param fileAddress 삭제할 파일의 URL
     */
    public void deleteFileFromS3(String fileAddress, String bucketName) {
        String key = getKeyFromFileAddress(fileAddress); // 파일의 키 추출
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key)); // 파일 삭제 요청
        } catch (Exception e) {
            log.error("Error occurred while deleting from S3: ", e);
            throw new S3Exception(ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE);
        }
    }

    /**
     * 파일 URL에서 S3 키 추출
     *
     * @param fileAddress 파일의 URL
     * @return S3 키
     */
    public String getKeyFromFileAddress(String fileAddress) {
        try {
            URL url = new URL(fileAddress); // URL 객체 생성
            String decodingKey = URLDecoder.decode(url.getPath(),
                StandardCharsets.UTF_8); // URL 디코딩
            return decodingKey.substring(1); // 맨 앞의 '/' 제거 후 반환
        } catch (MalformedURLException e) {
            log.error("Error parsing URL: ", e);
            throw new S3Exception(ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE);
        }
    }

    public boolean checkIfObjectExists(String url, String bucketName) {
        return amazonS3.doesObjectExist(bucketName, getKeyFromFileAddress(url));
    }

    /**
     * S3 버킷에서 파일을 다운로드
     *
     * @param fileAddress 다운로드할 파일의 URL
     * @return 파일의 InputStream
     */
    public InputStream downloadFileFromS3(String fileAddress, String bucketName) {
        String key = getKeyFromFileAddress(fileAddress); // 파일의 키 추출

        try {
            // S3에서 파일을 가져오기 위한 요청 생성
            GetObjectRequest getObjectRequest = new GetObjectRequest(bucketName, key);

            // S3에서 파일 가져오기
            S3Object s3Object = amazonS3.getObject(getObjectRequest);

            // 파일의 InputStream 반환
            return new BufferedInputStream(s3Object.getObjectContent());
        } catch (Exception e) {
            log.error("Error occurred while downloading from S3: ", e);
            throw new S3Exception(ErrorCode.IO_EXCEPTION_ON_IMAGE_DOWNLOAD);
        }
    }

}
