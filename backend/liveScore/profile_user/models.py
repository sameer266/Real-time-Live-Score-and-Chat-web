from django.db import models

# Create your models here.
class Profile(models.Model):
    user=models.OneToOneField('auth.User',on_delete=models.CASCADE)
    avatar=models.TextField(default='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50')
    bio=models.TextField(blank=True)
    
    def __str__(self):
        return self.user.username


class FollowerCount(models.Model):
    follower=models.CharField(max_length=100)  #--authenticated user 
    user=models.CharField(max_length=100)  # authenticated user following
    
    def __str__(self):
        return self.user