package com.ssafy.sayif.common.service;

import com.ssafy.sayif.common.exception.FileStorageException;
import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileService {

    private final MinioClient minioClient; // Minio 클라이언트 객체
    private final Tika tika = new Tika(); // Tika 객체를 통해 파일의 Content-Type을 감지

    /**
     * 로컬 디스크에 파일을 저장합니다.
     *
     * @param fileContent 파일의 바이트 배열
     * @param filename    저장할 파일 이름
     * @throws IOException 파일 저장 중 오류가 발생한 경우
     */
    public void saveFileLocally(byte[] fileContent, String filename) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(filename)) {
            fos.write(fileContent);
        }
    }

    /**
     * Minio 서버에 파일을 저장합니다. 저장할 때 파일 이름은 원본 이름과 UUID로 생성됩니다.
     *
     * @param fileContent      파일의 바이트 배열
     * @param bucketName       파일이 저장될 Minio 버킷 이름
     * @param originalFilename 파일의 원본 이름
     * @return 저장된 파일의 파일 이름(원본 이름 + UUID)
     */
    public String saveFileToMinio(byte[] fileContent, String bucketName, String originalFilename) {
        try {
            // 버킷 존재 여부 확인 및 생성
            ensureBucketExists(bucketName);

            // 파일 이름을 원본 이름과 UUID로 생성
            String uuid = UUID.randomUUID().toString();
            String filename = uuid + "-" + originalFilename;

            // 파일의 Content-Type 감지
            String contentType = tika.detect(fileContent);

            // Minio에 파일을 저장
            try (ByteArrayInputStream bais = new ByteArrayInputStream(fileContent)) {
                minioClient.putObject(
                    PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(filename)
                        .stream(bais, bais.available(), -1) // 스트림을 통한 업로드
                        .contentType(contentType) // Content-Type 설정
                        .build()
                );
            }

            System.out.println("File saved to Minio with filename: " + filename);
            return filename;
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new FileStorageException("Failed to save file to Minio", e);
        }
    }


    /**
     * Minio 서버에서 파일을 다운로드하여 바이트 배열로 반환합니다.
     *
     * @param filename   다운로드할 파일 이름
     * @param bucketName 파일이 저장된 Minio 버킷 이름
     * @return 파일의 바이트 배열
     * @throws IOException              다운로드 중 오류가 발생한 경우
     * @throws NoSuchAlgorithmException 보안 알고리즘 관련 오류가 발생한 경우
     * @throws InvalidKeyException      키가 유효하지 않은 경우
     */
    public byte[] downloadFile(String filename, String bucketName)
        throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        try (InputStream stream = minioClient.getObject(
            GetObjectArgs.builder()
                .bucket(bucketName)
                .object(filename)
                .build());
            ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {

            byte[] data = new byte[16384];
            int nRead;
            while ((nRead = stream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            return buffer.toByteArray();
        } catch (MinioException e) {
            throw new IOException("Error occurred while downloading file: " + e.getMessage(), e);
        }
    }

    /**
     * Minio 서버에서 파일에 접근할 수 있는 URL을 생성하여 반환합니다.
     *
     * @param filename   접근할 파일 이름
     * @param bucketName 파일이 저장된 Minio 버킷 이름
     * @return 파일의 URL
     */
    public String getFileUrl(String filename, String bucketName) {
        try {
            return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET) // HTTP GET 메서드 사용
                    .bucket(bucketName)
                    .object(filename)
                    .expiry(60 * 60 * 24) // URL 만료 시간 (1일)
                    .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while generating URL: " + e.getMessage(), e);
        }
    }

    /**
     * Minio 버킷이 존재하는지 확인하고, 존재하지 않으면 새로 생성합니다.
     *
     * @param bucketName 확인할 버킷 이름
     * @throws MinioException           Minio 클라이언트 관련 예외
     * @throws IOException              입출력 관련 예외
     * @throws NoSuchAlgorithmException 보안 알고리즘 관련 예외
     * @throws InvalidKeyException      키가 유효하지 않은 경우 발생하는 예외
     */
    private void ensureBucketExists(String bucketName)
        throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        boolean isExist = minioClient.bucketExists(
            BucketExistsArgs.builder().bucket(bucketName).build()
        );
        if (!isExist) {
            minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(bucketName).build()
            );
        }
    }

    /**
     * 파일을 다운로드하여 바이트 배열로 반환합니다.
     *
     * @param filename   다운로드할 파일 이름
     * @param bucketName 파일이 저장된 Minio 버킷 이름
     * @return 파일의 바이트 배열
     */
    public byte[] getFile(String filename, String bucketName) {
        try {
            return this.downloadFile(filename, bucketName);
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new FileStorageException(e.getMessage());
        }
    }

    /**
     * Minio 서버에서 객체를 가져옵니다.
     *
     * @param bucketName 버킷 이름
     * @param objectName 객체 이름
     * @return 객체의 InputStream
     * @throws MinioException Minio 클라이언트 관련 예외
     */
    public InputStream getObject(String bucketName, String objectName) throws MinioException {
        try {
            return minioClient.getObject(
                GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectName)
                    .build()
            );
        } catch (Exception e) {
            throw new MinioException("Error occurred while getting object from Minio",
                e.getMessage());
        }
    }
}
