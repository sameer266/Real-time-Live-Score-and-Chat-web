from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from profile_user.models import Profile
from profile_user.serializers import ProfileUserSerializers
from rest_framework.decorators import authentication_classes,permission_classes

# Create your views here.

class Profile_User(APIView):
    
   
    @authentication_classes([SessionAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self,request):
        user=request.user
        print(request)
        
        print(user)
        if user:
            username=User.objects.get(username=user)
            profile=Profile.objects.get(user=username)
            serializer=ProfileUserSerializers(profile)
            return Response({"profile_user":serializer.data})   
        else:
            Response({"error":"No user found"},status=400)
