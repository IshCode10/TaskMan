import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('access'); // Check if the user is logged in

  const fetchTasks = async () => {
    setError('');
    try {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('You are not logged in.');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
        localStorage.removeItem('access');
        navigate('/login');
      } else {
        setError('Failed to fetch tasks. Please try again.');
      }
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Tasks</h1>

      {!isAuthenticated ? (
        <div className="text-center">
          <p>You need to log in to view your tasks.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Display Tasks */}
          <div className="row">
            {tasks.map((task) => (
              <div key={task.id} className="col-md-4 mb-4">
                <div className={`card ${task.completed ? 'bg-light' : ''}`}>
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">
                      <strong>Description:</strong> {task.description || 'No description provided'}
                    </p>
                    <p className="card-text">
                      <strong>Due Date:</strong> {task.due_date || 'Not specified'}
                    </p>
                    <p className="card-text">
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {task.category}
                    </p>
                    <p className={`card-text ${task.completed ? 'text-success' : 'text-warning'}`}>
                      <strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}
                    </p>
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => navigate(`/tasks/edit/${task.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
