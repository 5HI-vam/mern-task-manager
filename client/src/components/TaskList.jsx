import TaskItem from './TaskItem';

const TaskList = ({ tasks, onStatusChange, onDelete, onEdit }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-300 mb-2">All caught up!</h3>
                <p className="text-slate-500">You don't have any tasks right now.</p>
            </div>
        );
    }

    // Group tasks by status for a nicer layout (Pending first, then Completed)
    const pendingTasks = tasks.filter(task => task.status !== 'completed');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    return (
        <div className="space-y-8">
            {pendingTasks.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">Active Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingTasks.map(task => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onStatusChange={onStatusChange}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                </div>
            )}

            {completedTasks.length > 0 && (
                <div className="space-y-4 mt-8 pt-8 border-t border-slate-800/50">
                    <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">Completed</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                        {completedTasks.map(task => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onStatusChange={onStatusChange}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
