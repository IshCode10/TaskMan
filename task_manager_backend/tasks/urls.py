from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import TaskViewSet, RegisterUserView, UserProfileView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = router.urls + [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile')
]

