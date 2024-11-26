from django.db import models
from django.contrib.auth.models import User
from matches.models import Team

# Create your models here.

class Poll(models.Model):
    question=models.CharField(max_length=200)
    team_A=models.ForeignKey(Team,on_delete=models.CASCADE,related_name='team_a',null=True)
    team_B=models.ForeignKey(Team,on_delete=models.CASCADE,related_name='team_b',null=True)
    
    def __str__(self):
        return f"{self.question} VS {self.team_A} {self.team_B}"

class Vote(models.Model):
    poll=models.ForeignKey(Poll,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    choice=models.CharField(max_length=50,choices=[('team_A','Team A',),('team_B','Team B')],null=True)
    
    def __str__(self):
        return self.user
    