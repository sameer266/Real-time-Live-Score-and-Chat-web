import os

from django.core.asgi import get_asgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "liveScore.settings")
django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from chats.routing import websocket_urlpatterns



# AllowedHostsOriginValidator is used for allowHost (Those how can requset ws )--set it in setting.py allow_host[]
application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket":URLRouter(websocket_urlpatterns)
        
    }
)


