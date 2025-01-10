from django.contrib import admin
from django.urls import path,include
from posts import views

urlpatterns = [
 path('posts-data/',views.PostsData.as_view()),
 path('posts-data/<username>/',views.Get_OneUser_Post.as_view()),
 
 #CRUD operation of Post Content
 path('create-post/',views.PostsData.as_view()),
 path('delete-post/<int:id>/',views.PostsData.as_view()),
 
 #like(create) and Dislike(delete) of Like Content
 path('like-posts/<int:id>/',views.LikePost.as_view()), #---> liked post save in DB

 
 #comment(create) and delete(delete) of Comment Content
 path('comment-posts/<int:id>/',views.CommentPost.as_view()), #---> comment save in DB
 path('delete-comment/<int:id>/',views.CommentPost.as_view()), #---> comment delete from DB
    
]