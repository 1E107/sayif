FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
COPY src/main/resources/application-secret.yml /app/config/application-secret.yml
ENV SPRING_CONFIG_LOCATION=/app/config/application-secret.yml
ENV SPRING_JWT_SECRET=bangcutsoragodoongmeruohboksayif
ENTRYPOINT ["java", "-jar", "/app.jar","--spring.config.additional-location=/app/config/application-secret.yml"]