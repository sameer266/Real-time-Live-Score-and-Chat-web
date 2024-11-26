from django.shortcuts import render

from polls.models import  Poll,Vote
from polls.serializers import PollsSerializer,VoteSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class PollQuestion(APIView):
    def get(self,request):
        question=Poll.objects.all()
        serializer=PollsSerializer(question,many=True)
        return Response({'questions':serializer.data},status=200)
    
class VotesData(APIView):
    def get(self,request):
        data=Vote.objects.all()
        
        