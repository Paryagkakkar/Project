function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  if (!tasks.length) {
    return <div className="text-center py-8 text-gray-500">No tasks yet. Add one to get started.</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <article key={task._id} className={`p-5 border border-gray-200 rounded-xl bg-white ${task.status === 'completed' ? 'bg-blue-50 border-blue-200' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <small className="text-gray-600 capitalize">{task.status}</small>
            </div>
            <button
              className="bg-gray-100 text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-transform hover:scale-105"
              onClick={() => onToggleComplete(task)}
            >
              {task.status === 'completed' ? 'Undo' : 'Done'}
            </button>
          </div>

          {task.description && <p className="text-gray-700 mb-3 leading-relaxed">{task.description}</p>}
          {task.dueDate && <p className="text-sm text-gray-500 mb-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => onEdit(task)} className="bg-gray-100 text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-transform hover:scale-105">
              Edit
            </button>
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition-transform hover:scale-105"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
