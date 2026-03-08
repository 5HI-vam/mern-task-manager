import { useState } from 'react';
import { CheckCircle, Circle, Trash2, Clock, Edit2, X, Check } from 'lucide-react';

const TaskItem = ({ task, onStatusChange, onDelete, onEdit }) => {
    const isCompleted = task.status === 'completed';
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const handleSave = () => {
        if (!editTitle.trim() || !editDescription.trim()) return;
        onEdit(task._id, { title: editTitle, description: editDescription });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description);
        setIsEditing(false);
    };

    return (
        <div className={`glass rounded-xl p-5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${isCompleted && !isEditing ? 'opacity-70' : ''}`}>
            <div className="flex items-start justify-between gap-4">
                {/* Status Toggle */}
                <button
                    onClick={() => !isEditing && onStatusChange(task._id, isCompleted ? 'pending' : 'completed')}
                    className={`mt-1 flex-shrink-0 transition-colors ${isEditing ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-emerald-400'}`}
                    title={isCompleted ? "Mark as pending" : "Mark as completed"}
                    disabled={isEditing}
                >
                    {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                        <Circle className="w-6 h-6 hover:text-emerald-400" />
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-3 mb-3">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                                placeholder="Task title"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                rows={2}
                                className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                                placeholder="Task description"
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className={`text-lg font-semibold text-slate-100 mb-1 truncate ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                                {task.title}
                            </h3>
                            <p className="text-slate-300 text-sm line-clamp-2 mb-3">
                                {task.description}
                            </p>
                        </>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        {!isEditing && (
                            <span className={`px-2 py-0.5 rounded-full ml-2 ${task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                                task.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-slate-500/20 text-slate-300'
                                }`}>
                                {task.status}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                                title="Save changes"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                                title="Cancel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                                title="Edit task"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(task._id)}
                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Delete task"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
