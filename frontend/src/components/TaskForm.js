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
    <div className="task-form-card">
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task title
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Add a title"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Describe the task"
          />
        </label>

        <div className="grid-row">
          <label>
            Status
            <select name="status" value={values.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label>
            Due date
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="button-row">
          <button type="submit" className="primary">
            {task ? 'Save changes' : 'Create task'}
          </button>
          {task && (
            <button type="button" onClick={onCancel} className="secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
