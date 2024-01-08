from django import forms
from .models import Difficulty

class MineForm(forms.Form):
   
    DifficultyList = [
        ("easy","簡單"),
        ("normal","普通"),
        ("hard","困難"),
    ]
    
    Difficultyvalue = forms.CharField(max_length=10,widget=forms.widgets.Select(choices=DifficultyList))










