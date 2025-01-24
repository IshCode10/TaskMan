from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import generics, permissions
from .models import Profile
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)

from rest_framework import generics, permissions
from .serializers import ProfileSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Return the authenticated user's profile
        return self.request.user.profile



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter tasks by the logged-in user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Assign the logged-in user to the task
        serializer.save(user=self.request.user)


class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        profile_picture = request.FILES.get('profile_picture')  # Handle file upload

        # Validate input
        if not username or not password or not email:
            raise ValidationError("Username, password, and email are required.")

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, password=password, email=email)

        # Check if the profile already exists (shouldn't happen in normal flow)
        if not hasattr(user, 'profile'):
            Profile.objects.create(user=user, profile_picture=profile_picture)

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)