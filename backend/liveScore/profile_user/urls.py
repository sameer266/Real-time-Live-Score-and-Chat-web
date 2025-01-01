

from django.urls import path
from . import views

urlpatterns = [
    path('get-profile-img/',views.Profile_User.as_view()),

   
]
