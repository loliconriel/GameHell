from django.urls import path
from . import views

urlpatterns = [
    path('Minesweeper/',views.MinesweeperMain,name='MinesweeperMain'),
    
]
