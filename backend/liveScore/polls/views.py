from django.shortcuts import render
from django.shortcuts import get_object_or_404

from polls.models import  Poll,Vote
from polls.serializers import PollsSerializer,VoteSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes,authentication_classes
from rest_framework import status

# Create your views here.
# ===============Poll questions data============
class PollQuestion(APIView):
    def get(self,request):
        question=Poll.objects.all()
        serializer=PollsSerializer(question,many=True)
        return Response({'questions':serializer.data},status=200)


# ==============Votes data ====================
class VotesData(APIView):
    # --------Get qusetion from Poll models-------
    def get(self,request):
        data=Vote.objects.all()
        serializer=VoteSerializer(data,many=True)
        return Response({'Votes_data':serializer.data})
    
    
    
    # ==========Post poll  vote by choosing team========
    # ---------Basic auth for POST only--------
  
  
    @permission_classes([IsAuthenticated])
    @authentication_classes([BasicAuthentication])
    def post(self, request, id):
        # Get the choice from the request data
        choice = request.data.get('choice')

        # Validate that the choice is either 'team_A' or 'team_B'
        if choice not in ['team_A', 'team_B']:
            return Response({"error": "Invalid choice"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the currently authenticated user
        user = request.user
        
        try:
            # Get the poll with the given ID
            poll = Poll.objects.get(id=id)
        except Poll.DoesNotExist:
            return Response({'error': "Poll not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Create or update the vote
        vote, created = Vote.objects.update_or_create(
            poll=poll, 
            user=user,
            defaults={'choice': choice}  # Add the choice value
        )

        if created:
            return Response({"success": "Vote created successfully"}, status=status.HTTP_201_CREATED)

        return Response({"success": "Vote updated successfully"}, status=status.HTTP_200_OK)