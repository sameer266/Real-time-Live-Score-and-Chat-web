from django.contrib.auth.models import User

from rest_framework import serializers
from polls.models import Poll,Vote
from matches.models import Team

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username',)

class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields='__all__'
        

class PollsSerializer(serializers.ModelSerializer):
    team_A=TeamSerializers()
    team_B=TeamSerializers()
    class Meta:
        model=Poll
        fields='__all__'

class VoteSerializer(serializers.ModelSerializer):
    poll=PollsSerializer()
    user=UserSerializer()
    class Meta:
        model=Vote
        fields='__all__'
