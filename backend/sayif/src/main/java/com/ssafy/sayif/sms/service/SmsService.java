package com.ssafy.sayif.sms.service;

import java.util.HashMap;
import java.util.Map;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final DefaultMessageService messageService;
    private final Map<String, String> verificationCodes = new HashMap<>(); // 전화번호와 인증코드를 매핑하는 Map

    public SmsService(
            @Value("${coolsms.api.key}") String apiKey,
            @Value("${coolsms.api.secret}") String apiSecret
    ) {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    public SingleMessageSentResponse sendVerificationCode(String phoneNumber) {
        String verificationCode = generateVerificationCode();
        verificationCodes.put(phoneNumber, verificationCode); // 인증 코드 저장

        Message message = new Message();
        message.setFrom("010-9998-6589"); // 발신번호 입력
        message.setTo(phoneNumber);
        message.setText("Sayif 회원가입 인증번호: " + verificationCode);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }
    public boolean verifyCode(String phoneNumber, String inputCode) {
        String storedCode = verificationCodes.get(phoneNumber);
        return storedCode != null && storedCode.equals(inputCode);
    }
    private String generateVerificationCode() {
        return String.valueOf((int) ((Math.random() * (999999 - 100000)) + 100000));
    }
}
