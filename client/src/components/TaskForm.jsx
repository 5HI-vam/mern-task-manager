import { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        onAdd({ title, description, status: 'pending' });
        setTitle('');
        setDescription('');
        setIsExpanded(false);
    };

    return (
        <div className="glass rounded-2xl p-6 mb-8 transition-all duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    className="w-full bg-transparent border-none text-xl font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 px-2 py-1"
                />

                {isExpanded && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
                        <textarea
                            placeholder="Add more details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none mt-2"
                        />

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsExpanded(false);
                                    setTitle('');
                                    setDescription('');
                                }}
                                className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!title.trim() || !description.trim()}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" />
                                Add Task
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TaskForm;
