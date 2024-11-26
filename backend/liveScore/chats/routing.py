from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/asc/<str:room>/', consumers.MyAsyncConsumer.as_asgi()),

]
