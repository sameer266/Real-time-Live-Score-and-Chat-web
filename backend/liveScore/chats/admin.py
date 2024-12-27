from django.contrib import admin

from  chats.models import ChatRooms,Message
from matches.models import Match,Tournament,Team
from polls.models import Poll,Vote
from posts.models import Post,Like,Comment

# Register your models here.
# ==========Chat app=============
class MessageInline(admin.TabularInline):
    model=Message
    extra=1
    fields=('sender','content','timestamp')
    readonly_fields=('timestamp',)

@admin.register(ChatRooms)
class AdminChatRooms(admin.ModelAdmin):
    list_display=('name','created_at')
    inlines=[MessageInline]
    
@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    list_display=('room','sender','content','timestamp')
    

#==============Match app=================
class  MatchInline(admin.TabularInline):
    model=Match
    extra=1
    fields='tournament','home_team','away_team','home_score','away_score','status','start_time'
    
@admin.register(Match)
class AdminMatch(admin.ModelAdmin):
    list_display=('id','tournament','home_team','away_team','home_score','away_score','status','start_time')
    
@admin.register(Tournament)
class AdminTournament(admin.ModelAdmin):
    list_display=('name',)
    inlines=[MatchInline]
    
       
@admin.register(Team)
class AdminTeam(admin.ModelAdmin):
    list_display=('name',)    
 
    
    
# =============== POLL app=====================
@admin.register(Poll)
class AdminPoll(admin.ModelAdmin):
    list_display=('id','question','team_A','team_B')    

@admin.register(Vote)
class AdminVote(admin.ModelAdmin):
    list_display=('id','poll','user','choice')
    


# =================POST app=====================
@admin.register(Post)
class AdminPost(admin.ModelAdmin):
    list_display=('title','image','created_at','user')


@admin.register(Like)
class AdminLike(admin.ModelAdmin):
    list_display=('user','post','created_at')
    
@admin.register(Comment)
class AdminComment(admin.ModelAdmin):
    list_display=('user','post','content','created_at')