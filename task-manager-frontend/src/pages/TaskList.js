import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setError('');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            });
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again.');
            console.error(err.response?.data || err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                setTasks(tasks.filter((task) => task.id !== taskId));
            } catch (err) {
                setError('Failed to delete task. Please try again.');
                console.error(err.response?.data || err);
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Task List</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
                className="btn btn-primary mb-4"
                onClick={() => navigate('/tasks/add')}
            >
                Add Task
            </button>

            <ul className="list-group">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            task.completed ? 'list-group-item-success' : ''
                        }`}
                    >
                        <div>
                            <h5>{task.title}</h5>
                            <p>
                                <strong>Description:</strong> {task.description || 'N/A'}
                            </p>
                            <p>
                                <strong>Due Date:</strong> {task.due_date || 'N/A'}
                            </p>
                            <p>
                                <strong>Priority:</strong> {task.priority}
                            </p>
                            <p>
                                <strong>Category:</strong> {task.category}
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                {task.completed ? 'Completed' : 'Pending'}
                            </p>
                        </div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
