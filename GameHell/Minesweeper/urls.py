from django.urls import path
from . import views

urlpatterns = [
    path('Minesweeper/',views.MinesweeperMain,name='Minesweeper'),
    path('Login',views.login,name ='Login'),
    path('Logout',views.logout,name = 'logout'),
    path('register/',views.register,name=  'register'),
    path('Minesweeper/GameSetting',views.GameSetting,name ='GameSetting'),
    path('Minesweeper/Setting',views.Setting,name= 'Setting'),
    path('Minesweeper/Gaming',views.Gaming,name='Gaming'),
    path('Leaderboard/',views.LeaderBoardhtml,name='Leaderboard')
]
