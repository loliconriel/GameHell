from django import forms
from Minesweeper.models import GamePrepare

class MineForm(forms.ModelForm):
    class Meta:
        model = GamePrepare
        fields = ['Difficulty']
        widgets = {
            'Diifficulty' : forms.Select(attrs={'readonly': 'readonly'}),
        }











