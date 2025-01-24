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
### Task List
![Task List](screenshots/task-list.png)

### Add Task
![Add Task](screenshots/add-task.png)

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

