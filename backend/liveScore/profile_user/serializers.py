from rest_framework import serializers
from profile_user.models import Profile,FollowerCount

class ProfileUserSerializers(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields='__all__'

class FollowerCountSerializer(serializers.ModelSerializer):
    class Meta:
        model=FollowerCount
        fields='__all__'