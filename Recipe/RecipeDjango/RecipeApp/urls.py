from django.urls import path
from RecipeApp import views

urlpatterns = [
    path('',views.getData),
    path('recipe/',views.recipe),
    path('ingredient_search/',views.ingredient_search),
    path('Recipe_detail_question/',views.recipe_detail_question),
    path('all_recipes/', views.all_recipes_api, name='all_recipes_api'),

#     # 'api/all_recipes/' 경로에 GET 요청이 오면 ExistingTableDataView의 get 메서드가 호출됩니다.
#     # name 매개변수는 이 URL 패턴의 이름을 설정하여 이후 참조에 사용합니다.
]

# json 변환 확인 URL
# urlpatterns = [
#     
# ]