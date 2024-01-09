from django import forms
from .models import Difficulty

class MineForm(forms.Form):
   
    DifficultyList = [
        ("easy","簡單"),
        ("normal","普通"),
        ("hard","困難"),
    ]
    
    Difficultyvalue = forms.CharField(max_length=10,widget=forms.widgets.Select(choices=DifficultyList))

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20)
    password = forms.CharField(max_length=20, widget=forms.PasswordInput)








