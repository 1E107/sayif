import base64
import json
import os
import uuid

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import (
    UnexpectedAlertPresentException,
    NoAlertPresentException,
)
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from minio import Minio
from minio.error import S3Error

# 페이지 로드 대기 시간
LOAD_TIME = 1

# JSON 파일에서 Minio 설정 로드
with open("minio_config.json", "r") as config_file:
    minio_config = json.load(config_file)

minio_client = Minio(
    minio_config["endpoint"],
    access_key=minio_config["access_key"],
    secret_key=minio_config["secret_key"],
    secure=minio_config["secure"],
)

bucket_name = "your-bucket-name"

# ChromeDriverManager를 통해 ChromeDriver를 자동으로 설치하고, Service 객체를 설정합니다.
service = Service(ChromeDriverManager().install())

# ChromeDriver 초기화 시 Service 객체와 함께 초기화합니다.
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # 브라우저 창을 표시하지 않음
driver = webdriver.Chrome(service=service, options=options)

def is_image_url(url):
    """
    주어진 URL이 이미지 파일인지 확인합니다.

    :param url: 파일의 URL
    :return: 이미지 파일이면 True, 그렇지 않으면 False
    """
    return url.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".bmp"))

def get_filename(index, file_extension):
    """
    인덱스와 파일 확장자를 사용하여 파일 이름을 생성합니다.

    :param index: 파일의 인덱스
    :param file_extension: 파일의 확장자
    :return: 생성된 파일 이름
    """
    return f"image_{index}.{file_extension}"

def upload_image_to_minio(data, index, file_extension):
    """
    이미지 데이터를 Minio 버킷에 업로드합니다.

    :param data: 이미지 데이터
    :param index: 파일의 인덱스
    :param file_extension: 파일의 확장자
    :return: 업로드된 파일의 이름
    """
    try:
        filename = get_filename(index, file_extension)
        minio_client.put_object(bucket_name, filename, data, len(data), content_type=f"image/{file_extension}")
        print(f"Uploaded to Minio: {filename}")
        return filename
    except S3Error as e:
        print(f"Error uploading to Minio: {e}")
    return None

def download_base64_image(data_url, index):
    """
    Base64로 인코딩된 이미지 데이터를 디코딩하여 Minio 버킷에 업로드합니다.

    :param data_url: Base64 인코딩된 이미지 데이터 URL
    :param index: 파일의 인덱스
    :return: 업로드된 파일의 이름
    """
    try:
        header, encoded = data_url.split(",", 1)
        data = base64.b64decode(encoded)
        file_extension = header.split(";")[0].split("/")[1]
        return upload_image_to_minio(data, index, file_extension)
    except Exception as e:
        print(f"Error downloading base64 image: {e}")
    return None

def extract_item(soup, class_name, default="No data"):
    """
    HTML에서 주어진 클래스 이름을 가진 항목을 추출합니다.

    :param soup: BeautifulSoup 객체
    :param class_name: 찾을 항목의 클래스 이름
    :param default: 항목을 찾지 못했을 때 반환할 기본 값
    :return: 추출된 항목의 텍스트
    """
    item = soup.find("li", class_=class_name)
    if item:
        text_wrap = item.find("div", class_="text_wrap")
        if text_wrap:
            return text_wrap.string.strip()
    return default

def object_exists_in_minio(filename):
    """
    Minio 버킷에 주어진 파일이 존재하는지 확인합니다.

    :param filename: 확인할 파일 이름
    :return: 파일이 존재하면 True, 그렇지 않으면 False
    """
    try:
        minio_client.stat_object(bucket_name, filename)
        return True
    except S3Error as e:
        if e.code == "NoSuchKey":
            return False
        print(f"Error checking if object exists in Minio: {e}")
        return False

# SQL 쿼리를 파일에 저장
def save_query(data, sql_file):
    """
    주어진 데이터를 사용하여 SQL INSERT 쿼리를 생성하고 파일에 저장합니다.

    :param data: SQL 쿼리에 사용할 데이터 튜플
    :param sql_file: 쿼리를 저장할 파일 경로
    """
    data = tuple(d.replace("'", "''") if isinstance(d, str) else d for d in data)
    query = f"""
    INSERT INTO spt_info (id, title, ranged, region, recruit_start, recruit_end, hit_count, method, img)
    VALUES ('{data[0]}', '{data[1]}', '{data[2]}', '{data[3]}', '{data[4]}', '{data[5]}', 0, '{data[6]}', '{data[7]}');
    """
    with open(sql_file, "a") as file:
        file.write(query + "\n")

# SQL 쿼리를 저장할 파일 경로
sql_file = "insert_queries.sql"

# 파일이 존재하면 삭제
if os.path.exists(sql_file):
    os.remove(sql_file)

try:
    for i in range(800, -1, -1):
        # Minio 버킷에 이미지가 존재하면 continue
        filename = get_filename(i, "png")  # 파일 이름 생성
        if object_exists_in_minio(filename):
            print(f"Index {i} already processed, skipping...")
            continue

        try:
            url = f"https://jaripon.ncrc.or.kr/home/kor/support/projectMng/edit.do?menuPos=1&idx={i}"
            driver.get(url)
            print(f"Accessing URL: {url}")

            # 경고창 처리
            try:
                alert = Alert(driver)
                alert.accept()
                print("Alert was present and accepted.")
            except NoAlertPresentException:
                pass  # 경고창이 없으면 계속 진행
            except UnexpectedAlertPresentException:
                print("Unexpected alert found and accepted.")
                Alert(driver).accept()

            # 페이지의 모든 요소가 로드될 때까지 대기
            WebDriverWait(driver, LOAD_TIME).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, "img"))
            )

            # 페이지의 전체 HTML 코드를 가져옴
            page_source = driver.page_source

            # BeautifulSoup을 사용하여 HTML 파싱
            soup = BeautifulSoup(page_source, "html.parser")

            # 모집 상태 확인
            tag_type = soup.find("div", class_="tag_box")
            type_tag = tag_type.text.strip() if tag_type else "No title found"

            # "모집중"인 경우에만 정보와 이미지를 저장
            if type_tag == "모집중":
                detail_view_div = soup.find("div", class_="detail_view")
                # 제목 추출
                title = detail_view_div.find("div", class_="title")
                title_text = title.string.strip() if title else "No title"

                # 항목 추출
                range_text = extract_item(soup, "item icon01", "No range")
                region_text = extract_item(soup, "item icon02", "No region")
                period_text = extract_item(soup, "item icon03", "No period")
                recruit_start = period_text.split(" ~ ")[0]
                recruit_end = period_text.split(" ~ ")[1]
                mtd_text = extract_item(soup, "item icon06", "No method")

                # 이미지 URL 추출
                img_tags = soup.find_all("img")
                img_urls = [
                    img["src"]
                    for img in img_tags
                    if "src" in img.attrs and (
                        is_image_url(img["src"]) or img["src"].startswith("data:image")
                    )
                ]

                image_path = None
                for img_url in img_urls:
                    if img_url.startswith("data:image"):
                        image_path = download_base64_image(img_url, i)

                # 데이터 저장
                data = (
                    i,
                    title_text,
                    range_text,
                    region_text,
                    recruit_start,
                    recruit_end,
                    mtd_text,
                    image_path,
                )
                save_query(data, sql_file)
        except Exception as e:
            print(f"Error processing URL {url}: {e}")

finally:
    # 브라우저를 닫습니다.
    driver.quit()
