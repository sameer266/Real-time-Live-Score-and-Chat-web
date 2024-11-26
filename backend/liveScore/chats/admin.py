from django.contrib import admin

from  chats.models import ChatRooms,Message
from matches.models import Match,Tournament,Team
from polls.models import Poll,Vote

# Register your models here.

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
    
    
@admin.register(Match)
class AdminMatch(admin.ModelAdmin):
    list_display=('id','tournament','home_team','away_team','home_score','away_score','status','start_time')
    
@admin.register(Tournament)
class AdminTournament(admin.ModelAdmin):
    list_display=('name',)
    
@admin.register(Team)
class AdminTeam(admin.ModelAdmin):
    list_display=('name',)    
 
    
    
    
@admin.register(Poll)
class AdminPoll(admin.ModelAdmin):
    list_display=('question','team_A','team_B')    

@admin.register(Vote)
class AdminVote(admin.ModelAdmin):
    list_display=('id','poll','user','choice')
    
    