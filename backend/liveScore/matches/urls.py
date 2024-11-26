

from django.urls import path
from . import views

urlpatterns = [
    path('all-matches/',views.AllMatchesData.as_view()),
    path('live-matches/',views.LiveMatchesData.as_view()),
    path('upcomming-matches/',views.UpcomingMatchesData.as_view())

   
]
