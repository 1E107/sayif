FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
COPY src/main/resources/application-secret.yml /app/config/application-secret.yml
ENV SPRING_CONFIG_LOCATION=/app/config/application-secret.yml
ENTRYPOINT ["java", "-jar", "/app.jar"]