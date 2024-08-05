# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = FastAPI()

# 모델 로드 함수
def load_model():
    # 모델 로드
    model = tf.keras.models.load_model('model/sayifChallengeModel.h5')
    return model

model = load_model()

# 이미지 전처리 함수
def preprocess_image(image: Image.Image):
    image = image.resize((224, 224))  # 모델 입력 크기에 맞게 조정
    img_array = np.array(image).astype(np.float32)  # 데이터 타입을 float32로 변환
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # 정규화
    return img_array

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # 이미지 파일 읽기
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    # 이미지 전처리
    img_array = preprocess_image(image)

    # 예측
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)
    predicted_prob = np.max(predictions, axis=1)

    # 클래스 인덱스를 클래스 이름으로 변환
    class_indices = {0: "비행기", 1: "자동차", 2: "고양이", 3: "강아지", 4: "꽃", 5: "과일", 6: "오토바이", 7: "사람"}
    class_names = [class_indices[i] for i in range(8)]
    predicted_label = class_names[predicted_class[0]]

    return JSONResponse(content={"predicted_class": predicted_label, "prediction_probability": float(predicted_prob[0])})
