from django.urls import path
from . import views

urlpatterns = [
    path('Minesweeper/',views.MinesweeperMain,name='Minesweeper'),
    path('Minesweeper/GameSetting',views.GameSetting,name ='GameSetting'),
    path('Minesweeper/Setting',views.Setting,name= 'Setting'),
    path('Minesweeper/Gaming',views.Gaming,name='Gaming')
]
