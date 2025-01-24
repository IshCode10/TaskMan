import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const { id } = useParams(); // Get task ID from the URL
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchTask = async () => {
    setError('');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      setTask(response.data);
    } catch (err) {
      setError('Failed to fetch task details.');
      console.error(err.response?.data || err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        task,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Task updated successfully.');
      setTimeout(() => navigate('/'), 2000); // Redirect to home page
    } catch (err) {
      setError('Failed to update task.');
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Edit Task</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={task.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={task.due_date || ''}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Completed</label>
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={task.completed}
            onChange={(e) => setTask({ ...task, completed: e.target.checked })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
