from rest_framework import serializers
from polls.models import Poll,Vote

class PollsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Poll
        fields='__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vote
        fields='__all__'