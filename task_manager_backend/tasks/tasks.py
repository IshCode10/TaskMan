from celery import shared_task
from django.core.mail import send_mail
from datetime import datetime, timedelta
from .models import Task

@shared_task
def send_task_reminders():
    # Get all tasks due within the next 24 hours and not completed
    upcoming_tasks = Task.objects.filter(
        completed=False,
        due_date__lte=datetime.now() + timedelta(days=1),
        due_date__gte=datetime.now()
    )

    for task in upcoming_tasks:
        # Send an email reminder to the user
        if task.user.email:  # Ensure the user has an email
            send_mail(
                subject=f'Reminder: Task "{task.title}" is Due Soon!',
                message=f'Dear {task.user.username},\n\n'
                        f'This is a reminder that your task "{task.title}" is due on {task.due_date}.\n\n'
                        f'Description: {task.description or "No description provided"}\n\n'
                        f'Best regards,\nTaskMan Team',
                from_email='ishmaiahe@gmail.com',  # Replace with your email
                recipient_list=[task.user.email],
                fail_silently=False,  # Raise exceptions for debugging
            )
