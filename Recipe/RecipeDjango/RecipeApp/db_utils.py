import mysql.connector
from mysql.connector import Error
from django.conf import settings
import json

file_path = settings.BASE_DIR / 'RecipeReact' / 'src' / 'json' / 'recipe_list_Data.json'



def db_connection(): # db 연결 함수 생성
    db_connector = None
    try:
        db_connetor = mysql.connector.connect(
            host="127.0.0.1",
            user="c20st03",
            password="Fxe1gAywXT0Puskn",
            database="c20st03",
            charset='utf8'
        )
        print("데이터베이스 연결됨!")
        return db_connetor
    except Error as error:
        print(f"데이터베이스 연결 오류: {error}")
    

def read_query(query): # 쿼리 실행 함수 생성
    connection = db_connection()
    cursor = connection.cursor() # 결과를 디렉토리 형태로 받음
    result = None
    try:
        cursor.execute(query) # 쿼리 실행
        result = cursor.fetchall() # 전체 결과 가져오기
        # print(result)
        return result
    except Error as error:
        print(f"쿼리 읽기 오류 : {error}")
    finally: #연결 닫아주기
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def write_to_json(data):
    try:
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f"{file_path} 경로에 파일 저장 완료.")
    except IOError as error: #IO에러는 없는 파일을 열려고 시도한 것
        print(f"파일 저장 오류: {error}")
