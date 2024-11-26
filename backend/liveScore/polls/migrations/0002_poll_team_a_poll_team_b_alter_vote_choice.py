# Generated by Django 5.1.3 on 2024-11-26 16:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0005_alter_tournament_name'),
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='poll',
            name='team_A',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_a', to='matches.team'),
        ),
        migrations.AddField(
            model_name='poll',
            name='team_B',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_b', to='matches.team'),
        ),
        migrations.AlterField(
            model_name='vote',
            name='choice',
            field=models.CharField(choices=[('team_A', 'Team A'), ('team_B', 'Team B')], max_length=50, null=True),
        ),
    ]
