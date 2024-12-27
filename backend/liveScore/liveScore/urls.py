
from django.contrib import admin
from django.urls import path,include

from liveScore import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('login/',views.Login.as_view()),
    path('signup/',views.Signup.as_view()),
    path('logout/',views.Logout.as_view()),
    
    path('chat/',include('chats.urls')),
    path('matches/',include('matches.urls')),
    path('polls/',include('polls.urls')),
    path('posts/',include('posts.urls')),
    
    
]
