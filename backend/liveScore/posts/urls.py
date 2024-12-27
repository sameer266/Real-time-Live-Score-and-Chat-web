from django.contrib import admin
from django.urls import path,include
from posts import views

urlpatterns = [
 path('posts-data/',views.PostsData.as_view()),
 path('posts-data/<username>/',views.Get_OneUser_Post.as_view()),
 path('create-post/',views.PostsData.as_view()),
 path('delete-post/<int:id>/',views.PostsData.as_view()),
 path('like-posts/<int:id>/',views.LikePost.as_view()), #---> liked post save in DB
    
]