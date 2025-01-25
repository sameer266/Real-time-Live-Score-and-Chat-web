from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from profile_user.models import Profile,FollowerCount
from posts.models import Post
from profile_user.serializers import ProfileUserSerializers,FollowerCountSerializer
from rest_framework.decorators import authentication_classes,permission_classes

# Create your views here.

class Profile_User(APIView):
    
   
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user=request.query_params['q']
        print(request)
        
        print(user)
        if user:
            username=User.objects.get(username=user)
            profile=Profile.objects.get(user=username)
            serializer=ProfileUserSerializers(profile)
            follower=len(FollowerCount.objects.filter(follower=user))
            following=len(FollowerCount.objects.filter(user=user))
            img=Post.objects.filter(user=username)
            image=[]
            for i in img:
                image.append(i.image)
            print(image)
            
          
            return Response({"profile_user":serializer.data,"follower":follower,"following":following,'images':image},status=200)   
        else:
            Response({"error":"No user found"},status=400)


    def put(self,request):
            user=request.user
            try:
                print(request.data)
                profile=Profile.objects.get(user=user)
                serializer=ProfileUserSerializers(profile,data=request.data,partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message":"Profile Updated Success","success":True,"avatar":serializer.data.get('avatar')})
                else:
                    return Response({"message":"Error in Updating profile","error":serializer.errors})
            except Exception as e :    
                return Response({"message":"Error in updating profile","error":str(e)})
            
            
            
            
