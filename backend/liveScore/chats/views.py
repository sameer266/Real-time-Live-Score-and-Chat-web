from django.shortcuts import render
from django.contrib.auth.models import User

from  chats.models import ChatRooms,Message
from chats.serializers import *


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class RoomsList(APIView):

    
    def get(self,request):
        rooms=ChatRooms.objects.all()
        serializer=ChatRoomsSerializers(rooms,many=True)
        return Response(serializer.data)
    
    
        
class JoinRoom(APIView):
    def get(self,request,room):
        room,created=ChatRooms.objects.get_or_create(name=room)
        message=Message.objects.filter(room=room).order_by('timestamp')
        message_list = [{"sender": msg.sender.username, "content": msg.content, "timestamp": msg.timestamp} for msg in message]
        return Response({'message':message_list})
    
  
        


