function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  if (!tasks.length) {
    return <div className="notice">No tasks yet. Add one to get started.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article key={task._id} className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
          <div className="task-card-header">
            <div>
              <h3>{task.title}</h3>
              <small>{task.status}</small>
            </div>
            <button className="complete-btn" onClick={() => onToggleComplete(task)}>
              {task.status === 'completed' ? 'Undo' : 'Done'}
            </button>
          </div>

          {task.description && <p>{task.description}</p>}
          {task.dueDate && <p className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}

          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button className="danger" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
