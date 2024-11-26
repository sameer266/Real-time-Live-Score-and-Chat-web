
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/',include('chats.urls')),
    path('matches/',include('matches.urls')),
    path('polls/',include('polls.urls')),
    
]
