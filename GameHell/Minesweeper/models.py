from django.db import models

# Create your models here.
class Difficulty(models.Model):
    DifficultyList = [
        ("easy","簡單"),
        ("normal","普通"),
        ("hard","困難"),
    ]
    MineDict = {
        "easy" : 10,
        "normal" : 40,
        "hard" : 99,
    }
    def __str__(self):
        return f"{self.DifficultyList}"
    
class GamePrepare(models.Model):
    mines = 0
    def __str__(self):
        return f"{self.mines}"