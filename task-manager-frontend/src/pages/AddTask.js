import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        due_date: '',
        priority: 'Medium',
        category: 'Other',
        completed: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleAddTask = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post(
                'http://127.0.0.1:8000/api/tasks/',
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccess('Task added successfully.');
            navigate('/tasks'); // Redirect to task list
        } catch (err) {
            setError('Failed to add task. Please try again.');
            console.error(err.response?.data || err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Task</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleAddTask}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={newTask.due_date}
                        onChange={(e) =>
                            setNewTask({ ...newTask, due_date: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                        className="form-select"
                        value={newTask.priority}
                        onChange={(e) =>
                            setNewTask({ ...newTask, priority: e.target.value })
                        }
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={newTask.category}
                        onChange={(e) =>
                            setNewTask({ ...newTask, category: e.target.value })
                        }
                    >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={newTask.completed}
                        onChange={(e) =>
                            setNewTask({ ...newTask, completed: e.target.checked })
                        }
                    />
                    <label className="form-check-label">Completed</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
