from rest_framework import serializers
from matches.models import Match,Team,Tournament

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tournament
        fields=('name',)

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields=('name',)

class MatchSerializer(serializers.ModelSerializer):
    tournament=TournamentSerializer()
    home_team=TeamSerializer()
    away_team=TeamSerializer()
    class Meta:
        model=Match
        fields='__all__'