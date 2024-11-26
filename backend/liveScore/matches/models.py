from django.db import models

# Create your models here.
class Tournament(models.Model):
    name=models.CharField( max_length=50,unique=True)
    
    def __str__(self):
        return self.name

class Team(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Match(models.Model):
    tournament=models.ForeignKey(Tournament,on_delete=models.CASCADE,default=None)
    
    home_team=models.ForeignKey(Team,on_delete=models.CASCADE,related_name='home_game')
    away_team=models.ForeignKey(Team,on_delete=models.CASCADE,related_name='away_game')
    home_score=models.IntegerField(default=0)
    away_score=models.IntegerField(default=0)
    status=models.CharField(max_length=10,choices=[('live','Live'),('finished','Finished'),('upcoming','Upcoming')])
    start_time=models.DateTimeField()
    
    def __str__(self):
        return f"{self.home_team} VS {self.away_team}"
    
    