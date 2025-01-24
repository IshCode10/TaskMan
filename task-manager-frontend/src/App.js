import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import EditTask from './pages/EditTask';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import AddTask from "./pages/AddTask";
import './styles/custom.css'; 


function App() {
  return (
    <Router>
      <NavBar /> {/* Include NavBar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
