from rest_framework import serializers
from profile_user.models import Profile

class ProfileUserSerializers(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields='__all__'
        