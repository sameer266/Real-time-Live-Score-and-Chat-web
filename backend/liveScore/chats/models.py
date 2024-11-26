from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ChatRooms(models.Model):
    name=models.CharField(unique=True,null=False,max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return  self.name
    
class Message(models.Model):
    room=models.ForeignKey(ChatRooms,on_delete=models.CASCADE)
    sender=models.ForeignKey(User,on_delete=models.CASCADE)
    content=models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return  f" Room is {self.room.name} and User is {self.sender} ";   
    
    