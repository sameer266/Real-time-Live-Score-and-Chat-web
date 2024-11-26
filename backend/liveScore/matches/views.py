from django.shortcuts import render

from matches.models import Match,Tournament,Team
from matches.serializers import MatchSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class AllMatchesData(APIView):

    def get(self,request):
        data=Match.objects.all()
        serializer=MatchSerializer(data,many=True)
        return Response({'matches_data':serializer.data},status=200)

class  LiveMatchesData(APIView):
    def get(self,request):
        data=Match.objects.get(status='Live')
        serializer=MatchSerializer(data,many=True)
        return Response({'Live_match':serializer.data},status=200)
        


class UpcomingMatchesData(APIView):
    def get(self,request):
        data=Match.objects.get(status='Upcoming')
        serializer=MatchSerializer(data,many=True)
        return Response({'Upcoming_matches':serializer.data},status=200)
        
        