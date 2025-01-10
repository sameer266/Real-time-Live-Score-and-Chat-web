

from django.urls import path
from . import views

urlpatterns = [
    path('profile-data/',views.Profile_User.as_view()),

   
]
