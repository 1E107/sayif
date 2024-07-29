FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar

# Copy the JAR file
COPY ${JAR_FILE} app.jar

# Copy the application-secret.yml file
COPY src/main/resources/application-secret.yml /app/config/application-secret.yml

ENTRYPOINT ["java", "-jar", "/app.jar"]