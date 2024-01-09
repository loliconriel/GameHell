# Generated by Django 4.2.7 on 2024-01-09 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Minesweeper', '0003_delete_category_delete_gameprepare_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='LeaderBoard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=50)),
                ('score', models.IntegerField()),
                ('difficulty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Minesweeper.difficulty')),
            ],
        ),
    ]
