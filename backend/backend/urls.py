from django.http import HttpResponse
from django.urls import path, include

def home(request):
    return HttpResponse("Welcome to My Fullstack Project!")

urlpatterns = [
    path('', home),  # This will handle the root URL (/)
    path('api/', include('store.urls')),  # Your existing API routes
]
