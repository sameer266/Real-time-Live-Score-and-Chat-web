# Generated by Django 5.1.3 on 2024-11-26 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0003_alter_team_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]