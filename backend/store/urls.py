from django.urls import path
from .views import ProductListCreate  # Ensure this matches the actual class in views.py

urlpatterns = [
    path('products/', ProductListCreate.as_view(), name='product-list-create'),
]
