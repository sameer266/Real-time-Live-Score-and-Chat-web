

# =========Views========
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication



class Login(APIView):
    authentication_classes=[BasicAuthentication]
    
    
    def post(self,request):
        username=request.data.get('username')
        password=request.data.get('password')
        try:
            user=authenticate(username=username,password=password)
            if user:
                login(request,user)
                return Response({"success":True,"message":"Login successfull","username":user.username},status=200)
            else:
                return Response({"success":False,"message":"Login not success"},status=400)
        except Exception as e:
            return Response({"error":str(e)},status=400)
        
        
class Signup(APIView):
    authentication_classes=[BasicAuthentication]
    
    def post(self,request):
        username=request.data.get('username')
        email=request.data.get('email')
        password=request.data.get('password')
        try:
            if(User.objects.filter(username=username,email=email)):
                return Response({"message":"Sorry username or email already exists"},status=401)
            
            user=User.objects.create_user(username=username, email=email,password=password)
            login(request,user)
            return Response({"success":True,"message":"Signup Success","username":user.username},status=200)
        except Exception as e:
            return Response({"message":"Server Error","error":str(e)},status=401)
    
class Logout(APIView):
    authentication_classes=[BasicAuthentication]
    
    def post(self,request):
        username=request.data.get('username')
        if username:
            logout(request)
            return Response({"Success":True,"message":"Logout Success"},status=200)
        else:
            return Response({"success":False,"message":"Error in logout"},status=400)
        
            
