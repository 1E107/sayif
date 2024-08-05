# -*- coding: utf-8 -*-
import base64
import json
import os
import io

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

LOAD_TIME = 1

with open("minio_config.json", "r") as config_file:
    minio_config = json.load(config_file)

minio_client = Minio(
    minio_config["endpoint"],
    access_key=minio_config["access_key"],
    secret_key=minio_config["secret_key"],
    secure=minio_config["secure"],
)

bucket_name = "spt-info-images"

service = Service(ChromeDriverManager().install())

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=service, options=options)
driver.set_page_load_timeout(30)

def is_image_url(url):
    return url.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".bmp"))

def get_filename(index, file_extension):
    return f"image_{index}.{file_extension}"

def upload_image_to_minio(data, index, file_extension):
    try:
        filename = get_filename(index, file_extension)
        data_bytes = io.BytesIO(data)
        file_size = len(data)
        minio_client.put_object(bucket_name, filename, data_bytes, file_size, content_type=f"image/{file_extension}")
        print(f"Uploaded to Minio: {filename}")
        return filename
    except S3Error as e:
        print(f"Error uploading to Minio: {e}")
    return None

def download_base64_image(data_url, index):
    try:
        header, encoded = data_url.split(",", 1)
        data = base64.b64decode(encoded)
        file_extension = header.split(";")[0].split("/")[1]
        return upload_image_to_minio(data, index, file_extension)
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

def object_exists_in_minio(filename):
    try:
        minio_client.stat_object(bucket_name, filename)
        return True
    except S3Error as e:
        if e.code == "NoSuchKey":
            return False
        print(f"Error checking if object exists in Minio: {e}")
        return False

def save_query(data, sql_file, existing_ids):
    data = tuple(d.replace("'", "''") if isinstance(d, str) else d for d in data)
    if data[0] in existing_ids:
        print(f"ID {data[0]} already exists in SQL file, skipping...")
        return
    query = f"""
    INSERT INTO spt_info (id, title, ranged, region, recruit_start, recruit_end, hit_count, method, img)
    VALUES ('{data[0]}', '{data[1]}', '{data[2]}', '{data[3]}', '{data[4]}', '{data[5]}', 0, '{data[6]}', '{data[7]}');
    """
    with open(sql_file, "a", encoding="utf-8") as file:
        file.write(query + "\n")
    existing_ids.add(data[0])

sql_file = "insert_queries.sql"
existing_ids = set()

if os.path.exists(sql_file):
    with open(sql_file, "r", encoding="utf-8") as file:
        for line in file:
            try:
                if "INSERT INTO spt_info" in line:
                    parts = line.split("VALUES ('")[1].split("',")[0]
                    existing_ids.add(parts)
            except IndexError:
                continue  # 잘못된 형식의 라인은 무시

try:
    for i in range(800, -1, -1):
        filename = get_filename(i, "png")
        if object_exists_in_minio(filename):
            print(f"Index {i} already processed, skipping...")
            continue

        try:
            url = f"https://jaripon.ncrc.or.kr/home/kor/support/projectMng/edit.do?menuPos=1&idx={i}"
            driver.get(url)
            print(f"Accessing URL: {url}")

            try:
                alert = Alert(driver)
                alert.accept()
                print("Alert was present and accepted.")
            except NoAlertPresentException:
                pass
            except UnexpectedAlertPresentException:
                print("Unexpected alert found and accepted.")
                Alert(driver).accept()

            WebDriverWait(driver, LOAD_TIME).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, "img"))
            )

            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")

            tag_type = soup.find("div", class_="tag_box")
            type_tag = tag_type.text.strip() if tag_type else "No title found"

            if type_tag == "모집중":
                detail_view_div = soup.find("div", class_="detail_view")
                title = detail_view_div.find("div", class_="title")
                title_text = title.string.strip() if title else "No title"

                range_text = extract_item(soup, "item icon01", "No range")
                region_text = extract_item(soup, "item icon02", "No region")
                period_text = extract_item(soup, "item icon03", "No period")
                recruit_start = period_text.split(" ~ ")[0]
                recruit_end = period_text.split(" ~ ")[1]
                mtd_text = extract_item(soup, "item icon06", "No method")

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
                save_query(data, sql_file, existing_ids)
        except Exception as e:
            print(f"Error processing URL {url}: {e}")

finally:
    driver.quit()
