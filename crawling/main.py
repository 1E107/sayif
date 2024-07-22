import base64
import json
import os

import mysql.connector
import requests
from bs4 import BeautifulSoup
from mysql.connector import errorcode
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

# db_config.json 파일 읽기
with open("db_config.json", "r") as config_file:
    db_config = json.load(config_file)


# 데이터베이스를 생성하는 함수
def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(
                db_config["database"]
            )
        )
    except mysql.connector.Error as err:
        print(f"Failed creating database: {err}")
        exit(1)


# ChromeDriverManager를 통해 ChromeDriver를 자동으로 설치하고, Service 객체를 설정합니다.
service = Service(ChromeDriverManager().install())

# ChromeDriver 초기화 시 Service 객체와 함께 초기화합니다.
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # 브라우저 창을 표시하지 않음
driver = webdriver.Chrome(service=service, options=options)


def is_image_url(url):
    return url.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".bmp"))


def get_unique_filename(folder, index, file_extension):
    file_name = f"image_{index}"
    return os.path.join(folder, f"{file_name}.{file_extension}")


def download_image(url, folder, index):
    try:
        file_extension = url.split(".")[-1]
        file_path = get_unique_filename(folder, index, file_extension)
        if os.path.exists(file_path):
            print(f"File already exists: {file_path}")
            return file_path
        response = requests.get(url)
        if response.status_code == 200:
            with open(file_path, "wb") as file:
                file.write(response.content)
            print(f"Downloaded: {file_path}")
            return file_path
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return None


def download_base64_image(data_url, folder, index):
    try:
        header, encoded = data_url.split(",", 1)
        data = base64.b64decode(encoded)
        file_extension = header.split(";")[0].split("/")[1]
        file_path = get_unique_filename(folder, index, file_extension)
        if os.path.exists(file_path):
            print(f"File already exists: {file_path}")
            return file_path
        with open(file_path, "wb") as file:
            file.write(data)
        print(f"Downloaded: {file_path}")
        return file_path
    except Exception as e:
        print(f"Error downloading base64 image: {e}")
    return None


def extract_item(soup, class_name, default="No data"):
    item = soup.find("li", class_=class_name)
    if item:
        text_wrap = item.find("div", class_="text_wrap")
        if text_wrap:
            return text_wrap.string.strip()
    return default


# 데이터베이스에 데이터 저장 함수
def save_to_db(cursor, data, sql_file):
    query = """
    INSERT INTO project_info (idx, title, ranged, region, period, method, image_path)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, data)
    # SQL 쿼리를 파일에 저장
    sql_query = cursor.statement
    with open(sql_file, "a") as file:
        file.write(sql_query + ";\n")


# 테이블 생성 함수
def create_table(cursor):
    create_table_query = """
    CREATE TABLE IF NOT EXISTS project_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        idx INT,
        title VARCHAR(255),
        ranged VARCHAR(255),
        region VARCHAR(255),
        period VARCHAR(255),
        method VARCHAR(255),
        image_path VARCHAR(255)
    );
    """
    cursor.execute(create_table_query)


# 이미지 다운로드 폴더
folder = "images"
if not os.path.exists(folder):
    os.makedirs(folder)

# SQL 쿼리를 저장할 파일 경로
sql_file = "insert_queries.sql"

# 파일이 존재하면 삭제
if os.path.exists(sql_file):
    os.remove(sql_file)

try:
    # 데이터베이스 연결
    conn = mysql.connector.connect(**db_config)
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_BAD_DB_ERROR:
        conn = mysql.connector.connect(
            host=db_config["host"],
            user=db_config["user"],
            password=db_config["password"],
        )
        cursor = conn.cursor()
        create_database(cursor)
        conn.database = db_config["database"]
    else:
        print(err)
        exit(1)

cursor = conn.cursor()

# 테이블 생성
create_table(cursor)

try:
    # 지정된 URL로 이동
    for i in range(800, -1, -1):
        # 인덱스 폴더가 존재하면 continue
        if os.path.exists(os.path.join(folder, f"image_{i}.png")):
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
                pass  # No alert found, continue processing
            except UnexpectedAlertPresentException:
                print("Unexpected alert found and accepted.")
                Alert(driver).accept()

            # 페이지의 모든 요소가 로드될 때까지 대기
            WebDriverWait(driver, 2).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, "img"))
            )

            # 페이지의 전체 HTML 코드를 가져옴
            page_source = driver.page_source

            # BeautifulSoup을 사용하여 HTML 파싱
            soup = BeautifulSoup(page_source, "html.parser")

            # "모집중"인 경우에만 정보와 이미지를 저장
            tag_type = soup.find("div", class_="tag_box")
            type_tag = tag_type.text.strip() if tag_type else "No title found"

            if type_tag == "모집중":
                print(f"Type: {type_tag}")
                detail_view_div = soup.find("div", class_="detail_view")
                # 제목 추출
                title = detail_view_div.find("div", class_="title")
                title_text = title.string.strip() if title else "No title"

                # 항목 추출
                range_text = extract_item(soup, "item icon01", "No range")
                region_text = extract_item(soup, "item icon02", "No region")
                period_text = extract_item(soup, "item icon03", "No period")
                mtd_text = extract_item(soup, "item icon06", "No method")

                # 이미지 URL 추출
                img_tags = soup.find_all("img")
                img_urls = [
                    img["src"]
                    for img in img_tags
                    if "src" in img.attrs
                    and (
                        is_image_url(img["src"]) or img["src"].startswith("data:image")
                    )
                ]

                image_path = None
                for img_url in img_urls:
                    file_name = img_url.split("/")[-1].split(".")[0]
                    if img_url.startswith("data:image"):
                        image_path = download_base64_image(img_url, folder, i)

                # 데이터베이스에 저장
                data = (
                    i,
                    title_text,
                    range_text,
                    region_text,
                    period_text,
                    mtd_text,
                    image_path,
                )
                save_to_db(cursor, data, sql_file)
                conn.commit()

        except Exception as e:
            print(f"Error processing URL {url}: {e}")

finally:
    try:
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error closing database connection: {e}")
    # 브라우저를 닫습니다.
    driver.quit()
