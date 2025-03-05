from django.shortcuts import HttpResponse, redirect
from django.views.decorators.csrf import csrf_exempt
import json,os
from openai import OpenAI
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .db_utils import read_query, write_to_json, file_path
from .key import security_key



total_ingredient = []
total_recipe = None  # 전역 변수로 total_recipe 초기화

os.makedirs(os.path.dirname(file_path), exist_ok=True)

client = OpenAI(api_key=security_key)
@csrf_exempt
def recipe(request):
    print(request.POST)
    global total_ingredient, total_recipe  # 전역 변수 선언
    # global total_recipe
    key = json.loads(request.body)['v']
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user","content": f'''
             {key} 에 대한 설명을 어디에 좋고 무슨 재료랑 잘어울리고 그런 설명을 4줄로 "설명"이라는 "키"로 설명해주고 기본 재료, 양념 재료를 
             '기본재료'와 '양념재료' 라는 키 로 설명해주고 키 재료 값으로는 용량인 JSON 형태로 보여줘.
               그리고 레시피를단'단계'라는 키로 "1단계", "2단계", "3단계", "4단계로 나누어 설명해줘 
               그리고 알레르기 성분을 알레르기 성분 이라는 "키"로 ,로 구분해줘 칼로리도 칼로리 란 "키"로
                2인분 기준 칼로리만 알려주고 숫자칼로리만 나오게 해줘.'''}
        ],
        response_format={"type":"json_object"}
    )
    data = completion.choices[0].message.content

    # 전역 변수에 GPT 데이터를 저장
    total_recipe = data
    print("Total recipe data:", total_recipe)

    # 세션에 저장
    # request.session['recipe_data'] = data
    # request.session.modified = True  # 세션 저장 강제
    # print("Saved recipe_data in session:", request.session.get('recipe_data')) # 세션 저장 확인

    # print(data)
    ingredient = json.loads(data)['기본재료']
    # total_recipe = data
    # print(total_recipe)
    for key_value, v in ingredient.items():
        total_ingredient.append(key_value)
    # ingredient_search("recipe/")
    return HttpResponse(data)


#검색 부분
@csrf_exempt
def ingredient_search(request):
    search_data = json.loads(request.body)['v']
    print(search_data)
    completion = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user","content": f'''신선한 {search_data} 고르는 방법 알려줘! 
                  고르는 법 "설명" 이라는 키로 "1단계", "2단계", "3단계", "4단계로 나누어 설명해줘 설명해줘 json'''}
            ],
            response_format={"type":"json_object"}
        )
    data = completion.choices[0].message.content
    print(data)
    return HttpResponse(data)


    # return redirect("http://192.168.0.221:3000/recipe")
    # for v in total_ingredient:
    #     completion = client.chat.completions.create(
    #         model="gpt-3.5-turbo-1106",
    #         messages=[
    #             {"role": "system", "content": "You are a helpful assistant."},
    #             {"role": "user","content": f''' 신선한 {v} 고르는 법 단알려줘 json'''}
    #         ],
    #         response_format={"type":"json_object"}
    #     )
    #     data = completion.choices[0].message.content
    #     print(data)

@csrf_exempt
def recipe_detail_question(request):
    global total_recipe  # 전역 변수 가져오기
    question_data = json.loads(request.body)['v']
    if total_recipe is None:
        return HttpResponse("No recipe data available", status=400)
    # recipe_data = request.session.get('recipe_data')
    # print(recipe_data)
    # print(question_data)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        # messages=[
        #     {"role": "system", "content": "You are a helpful assistant."},
        #     {"role": "user","content": f'''[{question_data}] /  []안의 질문에 대해 답변해줘.
        #      혹시 []안의 질문이 요리, 음식, 레시피등에 대한 질문이 아니라면 "요리와 관련된 질문만 부탁드립니다." 라고 답변해줘 json'''}
        # ]
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user","content": f'''현재 사용자는 {total_recipe}의 내용을 읽었어. 
             그리고 {question_data}라는 질문을 했어. 
             사용자의 질문에 친절하게 "답변" 이라는 키로 답변해줘.만약 사용자의 질문이 요리, 음식, 레시피등에 대한 질문이 아니라면 "요리와 관련된 질문만 부탁드립니다." 라고 "답변" 이라는 키로 답변해줘 json'''}
        ]
    )
    data = completion.choices[0].message.content
    # print(data)
    return HttpResponse(data)


@csrf_exempt
def getData(request):
    return HttpResponse("HI")
    
            
# Create your views here.
@api_view(['GET'])
def all_recipes_api(request):  # GET 요청을 처리하는 함수
    select_query = "SELECT * FROM recipe_list;"
    results = read_query(select_query)
    if results:
        write_to_json(results)
        # json_data = json.dumps(results, ensure_ascii=False, indent=4)
        return JsonResponse({"message": f"JSON 파일로 {file_path}에 저장이 완료되었습니다.", "data": results},json_dumps_params={'ensure_ascii': False, 'indent':4})
    return JsonResponse({"message": "데이터가 없습니다."}, json_dumps_params={'ensure_ascii': False})
