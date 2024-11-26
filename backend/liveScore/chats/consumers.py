from channels.generic.websocket import AsyncConsumer
import json
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from channels.exceptions import StopConsumer
from urllib.parse import parse_qs

from django.contrib.auth import authenticate

from django.contrib.auth.models import User
from chats.models import ChatRooms, Message

class MyAsyncConsumer(AsyncConsumer):
    # -------Connection----------
    async def websocket_connect(self, event): 
# Get query parameters from the URL
        query_params = self.scope['query_string'].decode()
# Parse query string into a dictionary
        params = parse_qs(query_params)
# Get 'username' and 'password', default to None if not found
        username = params.get('username', [None])[0]
        password = params.get('password', [None])[0]
        user=await sync_to_async(authenticate)(username=username,password=password)
        if (user):
            self.room_name = self.scope['url_route']['kwargs']['room']
            self.room_group_name = self.room_name
            
            # Add the channel to the group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.send({
                "type": "websocket.accept"
            })
        else:
            await self.send({
                "type":"websocket.close"
            })
            raise StopConsumer()



    # --------------Disconnect---------------
    async def websocket_disconnect(self, event):
            # Remove the channel from the group
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            raise StopConsumer()
        
        
        
        # ---------------Receive----------------

    async def websocket_receive(self, event):
            # Parsing the received message
            print("Data received:", event)
            message_data = json.loads(event['text'])
            print('Received message:', message_data)
            message = message_data.get('message', '')

            try:
                # Get or create the chat room
                room_data, created = await database_sync_to_async(ChatRooms.objects.get_or_create)(name=self.room_group_name)
                user= await database_sync_to_async(User.objects.get)(username="admin")
                # Get the user (can be dynamically taken from WebSocket scope)
            
                
                # Save the message to the database
                if message:
                    await database_sync_to_async(Message.objects.create)(room=room_data, sender=user, content=message)
                    print("Message saved to database.")
                else:
                    print("No message to save.")
                
            except Exception as e:
                print("Error while saving message:", e)
            
            # Send the message to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message
                }
            )

    async def chat_message(self, event):
            # Send the message to the WebSocket
            message = event['message']
            print('Sending message:', message)
            await self.send({
                "type": "websocket.send",
                "text": json.dumps({'message': message})  # Ensure the message is wrapped in a JSON format
            })
            print('Message sent to client.')
