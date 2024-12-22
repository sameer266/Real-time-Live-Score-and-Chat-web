

from django.urls import path
from . import views

urlpatterns = [
    path('list-rooms/',views.RoomsList.as_view()),
    path('messages-list/<str:room>/',views.JoinRoom.as_view()),
   
]
