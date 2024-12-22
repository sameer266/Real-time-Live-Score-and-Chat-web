

from django.urls import path
from . import views

urlpatterns = [
    path('poll-question/',views.PollQuestion.as_view()),
    path('votes-data/',views.VotesData.as_view
         ()),
    path('post-vote/<int:id>/',views.VotesData.as_view()),
    
    
   
]
