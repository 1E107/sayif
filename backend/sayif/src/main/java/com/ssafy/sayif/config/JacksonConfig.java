package com.ssafy.sayif.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.hibernate5.jakarta.Hibernate5JakartaModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.registerModule(new Hibernate5JakartaModule());
        objectMapper.registerModule(jsonMapperJava8DateTimeModule()); // 추가된 부분
        objectMapper.disable(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS);
        return objectMapper;
    }

    @Bean
    public SimpleModule jsonMapperJava8DateTimeModule() {
        SimpleModule module = new SimpleModule();

        module.addSerializer(LocalDate.class, new JsonSerializer<>() {
            @Override
            public void serialize(
                    LocalDate localDate, JsonGenerator jsonGenerator,
                    SerializerProvider serializerProvider)
                    throws IOException, IOException {
                    jsonGenerator.writeString(
                        DateTimeFormatter.ofPattern("yyyy-MM-dd").format(localDate));
            }
        });

        module.addSerializer(LocalTime.class, new JsonSerializer<>() {
            @Override
            public void serialize(
                    LocalTime localTime, JsonGenerator jsonGenerator,
                    SerializerProvider serializerProvider)
                    throws IOException {
                jsonGenerator.writeString(
                        DateTimeFormatter.ofPattern("kk:mm:ss").format(localTime));
            }
        });

        module.addSerializer(LocalDateTime.class, new JsonSerializer<>() {
            @Override
            public void serialize(
                    LocalDateTime localDateTime, JsonGenerator jsonGenerator,
                    SerializerProvider serializerProvider)
                    throws IOException {
                jsonGenerator.writeString(
                        DateTimeFormatter.ofPattern("yyyy-MM-dd kk:mm:ss").format(localDateTime));
            }
        });

        return module;
    }
}