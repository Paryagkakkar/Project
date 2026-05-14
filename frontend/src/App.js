import { useEffect, useState } from 'react';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 font-sans">
      <header className="bg-indigo-600 text-white py-8 px-8 text-center shadow-lg">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Task Manager</h1>
          <p className="text-lg opacity-90">Built with React, Express, MongoDB and REST API</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6 space-y-6">
        <section className="bg-white bg-opacity-95 rounded-3xl shadow-xl p-6">
          <TaskForm
            onSubmit={selectedTask ? (data) => updateTask(selectedTask._id, data) : addTask}
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}
          />
        </section>

        <section className="bg-white bg-opacity-95 rounded-3xl shadow-xl p-6">
          {error && <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">{error}</div>}
          {loading ? (
            <div className="text-center py-8">Loading tasks...</div>
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
