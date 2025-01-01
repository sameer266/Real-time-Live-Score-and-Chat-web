from django.db import models
from django.contrib.auth.models import User
from profile_user.models import Profile

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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)  # Assuming you have a Post model
    content = models.TextField(null=True, blank=True)
    avatar = models.TextField(default='https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"

    @property
    def avatar_url(self):
        """Return avatar URL from Profile or default if not found."""
        try:
            profile = self.user.profile  # Get the profile associated with the user
            return profile.avatar if profile.avatar else 'https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'
        except Profile.DoesNotExist:
            return 'https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'
