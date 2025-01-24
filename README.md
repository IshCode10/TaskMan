# TaskMan

A full-stack task manager application built with **React**, **Django REST Framework**, and **SQLite**.

## Features
- **User Authentication**: Register, login, and manage sessions.
- **Task Management**: Create, delete, categorize, and prioritize tasks.
- **Dynamic UI**: Responsive frontend built with React and Bootstrap.
- **Backend API**: Built with Django REST Framework.

## Tech Stack
- **Frontend**: React, Bootstrap
- **Backend**: Django REST Framework
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

## Screenshots
### Register

![Screenshot 2025-01-24 072834](https://github.com/user-attachments/assets/3c628d3e-e231-4b37-8e65-5cfa122ec4ff)

### Add Task

![Screenshot 2025-01-24 072739](https://github.com/user-attachments/assets/84e5a60d-857a-4cce-b9d2-fa3f0062f636)

### Home Page

![Screenshot 2025-01-24 072713](https://github.com/user-attachments/assets/137a4a28-060f-4442-9aa6-e43dd50a1d3e)

### Profile Page

![Screenshot 2025-01-24 072809](https://github.com/user-attachments/assets/0fa31466-a8c0-4efe-a48f-ce516fedc5dc)



## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app

## Set up Backend
cd task_manager_backend

python -m venv venv

source venv/bin/activate  # For Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

## Set up Frontend

cd task-manager-frontend

npm install

npm start

## Future Enhancements

Add drag-and-drop functionality for task prioritization.

Implement task reminders using email notifications.

Add cloud-based database integration (e.g., PostgreSQL).
