# Generated by Django 5.1.3 on 2024-11-26 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0002_team_tournament_alter_match_away_team_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(default=None, max_length=50),
        ),
    ]
