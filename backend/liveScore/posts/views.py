from django.shortcuts import render
from django.contrib.auth.models import User
from posts.models import Post,Like
from posts.serializers import PostSerializer,LikeSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes,permission_classes
# Create your views here.

# =============Get All data and craete post=======
class PostsData(APIView):
    
    # --------Get all Post------
    def get(self,request):
        post=Post.objects.all().order_by('-created_at')
        serializer=PostSerializer(post,many=True)
        return Response({'post_data':serializer.data,"success":True},status=200)
    
    
    
    # -----Create Post-----
    @permission_classes([IsAuthenticated])
    @authentication_classes([BasicAuthentication])
    def post(self, request):
        data = request.data
        if data:
            try:
                print(data)
                serializer = PostSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({
                        "success": "Your post is created",
                        "data": serializer.data,
                        "success": True
                    }, status=201)
                else:
                    return Response({
                        'error': f"Error in creating post {serializer.errors}",
                        "success": False
                    }, status=400)
            except User.DoesNotExist:
                return Response({
                    'error': "User with the given username does not exist.",
                    "success": False
                }, status=400)
            except Exception as e:
                return Response({
                    'error': "Data not found or an error occurred while creating the post",
                    "success": False,
                    "error": str(e)
                }, status=400)


     
     #---delete post----------     
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def delete(self,request,id):
        if id:
            post=Post.objects.get(id=id)
            post.delete()
            return Response({"message":"Deleted ","success":True},status=201)
        else:
            return Response({"error":"Error in Deleting Post","success":False},status=401)


# ===========When user likes a post, save to DB===============
class LikePost(APIView):
    
    # sing decorator deoestnot override global setting
    @authentication_classes([SessionAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request,id):
        try:
            
            try:
                post = Post.objects.get(id=id)
            except Post.DoesNotExist:
                return Response({"error": "Post not found.","success":False}, status=404)

            username=request.data.get('username')
            user=User.objects.get(username=username)
            
            # Check if the user has already liked the post
            if Like.objects.filter(post=post, user=user).exists():
                return Response({"error": "You have already liked this post.","success":False}, status=400)

            # Create and save the Like entry
            Like.objects.create(post=post, user=user)
            return Response({"message": "You have liked the post.","success":True}, status=201)
        
        except Exception as e:
            return Response({"error":str(e),"success":False},status=400)    

# ======Get one User Post=======
class Get_OneUser_Post(APIView):
    def get(self,request,username):
        try:
            if username:
                post=Post.objects.filter(user__username=username)
                serializer=PostSerializer(post,many=True)
                return Response({"message":"Succes to get Post by user","success":True,"data":serializer.data},status=201)
        except Exception as e:
            return Response({"error":str(e),"success":False})
        
    