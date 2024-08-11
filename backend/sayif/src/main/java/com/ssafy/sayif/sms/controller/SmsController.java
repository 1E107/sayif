package com.ssafy.sayif.sms.controller;
import com.ssafy.sayif.sms.dto.VerificationRequestDto;
import com.ssafy.sayif.sms.service.SmsService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    // 인증 코드를 보내는 요청
    @PostMapping("/send-verification-code")
    public SingleMessageSentResponse sendVerificationCode(@RequestBody VerificationRequestDto request) {
        return smsService.sendVerificationCode(request.getPhoneNumber());
    }

    // 인증 코드를 검증하는 요청
    @PostMapping("/verify-code")
    public boolean verifyCode(@RequestBody VerificationRequestDto request) {
        return smsService.verifyCode(request.getPhoneNumber(), request.getCode());
    }
}
