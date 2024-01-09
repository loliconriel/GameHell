from django.db import models

# Create your models here.

class Difficulty(models.Model):
    DifficultyList = [
        ("easy","簡單"),
        ("normal","普通"),
        ("hard","困難"),
    ]
    Difficultyvalue = models.CharField(max_length = 10,choices = DifficultyList)
    def __str__(self):
        return f"{self.DifficultyList}"
    
class LeaderBoard(models.Model):
    player_name = models.CharField(max_length=50)
    score = models.IntegerField()
    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.player_name} - {self.score} - {self.difficulty.Difficultyvalue}"