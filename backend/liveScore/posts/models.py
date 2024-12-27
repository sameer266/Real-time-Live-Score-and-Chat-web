from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    title=models.CharField(max_length=255)
    image=models.CharField(max_length=255,default=False)
    created_at=models.DateField(auto_now_add=True)
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Post by {self.user.username}"
    
    
class Like(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Liked by {self.user.username}"
    
class Comment(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    content=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return  f" Comment by {self.user.username}"