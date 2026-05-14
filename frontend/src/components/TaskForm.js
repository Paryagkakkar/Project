import { useEffect, useState } from 'react';

const initialValues = {
  title: '',
  description: '',
  status: 'pending',
  dueDate: '',
};

function TaskForm({ onSubmit, task, onCancel }) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title,
        description: task.description || '',
        status: task.status || 'pending',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      });
    } else {
      setValues(initialValues);
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      return;
    }
    onSubmit(values);
    setValues(initialValues);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task title</label>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Add a title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Describe the task"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-vertical"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-transform hover:scale-105">
            {task ? 'Save changes' : 'Create task'}
          </button>
          {task && (
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-900 px-5 py-2 rounded-full hover:bg-gray-300 transition-transform hover:scale-105">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
