from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from profile_user.serializers import ProfileUserSerializers
from posts.models import Post, Like,Comment



#======= Basic serializer for username input
class UserBasicSerializer(serializers.Serializer):
    username = serializers.CharField()

# =====LikeSerializer to serialize Like model
class LikeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Like
        fields = '__all__'


#========== CommentSerializer to serialize Comment model
class CommentSerializer(serializers.ModelSerializer):
    user=UserBasicSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
    

#======== PostSerializer to serialize Post model
class PostSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer()  # Use a basic serializer for deserialization
    likes_count = serializers.SerializerMethodField()
    liked_users = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'created_at', 'user', 'likes_count', 'liked_users','comments_count','comments')

    def create(self, validated_data):
        # Extract and process username from user data
        
        user=validated_data.pop('user')
        username=user.get('username')
        # Fetch the user object
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError({"user": "User with the given username does not exist."})

        # Create the post and associate the fetched user
        post = Post.objects.create(user=user, **validated_data)
        return post

    #like_count and liked_users fields are added to the PostSerializer
    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()

    def get_liked_users(self, obj):
        return Like.objects.filter(post=obj).values_list('user__username', flat=True)

    # comments_count and comments fields are added to the PostSerializer
    def get_comments_count(self, obj):
        return Comment.objects.filter(post=obj).count()
    
    def get_comments(self,obj):
        comment= Comment.objects.filter(post=obj)
        return CommentSerializer(comment,many=True).data