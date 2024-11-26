from rest_framework  import serializers
from chats.models import ChatRooms,Message

class ChatRoomsSerializers(serializers.ModelSerializer):
    class Meta:
        model=ChatRooms
        fields='__all__'
        
class MessageSerializers(serializers.ModelSerializer):
    class Meta:
        model=Message
        fields='__all__'
        
        