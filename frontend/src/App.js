import { useEffect, useState } from 'react';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks((prev) => [response.data, ...prev]);
    } catch (err) {
      setError('Unable to create task.');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks((prev) => prev.map((task) => (task._id === id ? response.data : task)));
      setSelectedTask(null);
    } catch (err) {
      setError('Unable to update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError('Unable to delete task.');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
      const response = await api.put(`/tasks/${task._id}`, {
        ...task,
        status: nextStatus,
      });
      setTasks((prev) => prev.map((item) => (item._id === task._id ? response.data : item)));
    } catch (err) {
      setError('Unable to toggle completion.');
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Task Manager</h1>
          <p>Built with React, Express, MongoDB and REST API</p>
        </div>
      </header>

      <main>
        <section className="form-panel">
          <TaskForm
            onSubmit={selectedTask ? (data) => updateTask(selectedTask._id, data) : addTask}
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}
          />
        </section>

        <section className="list-panel">
          {error && <div className="notice error">{error}</div>}
          {loading ? (
            <div className="notice">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onEdit={handleEdit}
              onToggleComplete={toggleComplete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
