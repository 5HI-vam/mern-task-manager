import { useState, useEffect } from 'react';
import { LayoutList, RefreshCcw } from 'lucide-react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import taskService from './api/taskService.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
      await taskService.updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert if failed
      fetchTasks();
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Optimistic update
      setTasks(tasks.filter(t => t._id !== taskId));
      await taskService.deleteTask(taskId);
    } catch (err) {
      console.error('Error deleting task:', err);
      // Revert if failed
      fetchTasks();
    }
  };

  const handleEditTask = async (taskId, updatedData) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => t._id === taskId ? { ...t, ...updatedData } : t));
      await taskService.updateTask(taskId, updatedData);
    } catch (err) {
      console.error('Error updating task:', err);
      // Revert if failed
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 selection:bg-indigo-500/30">

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <header className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <LayoutList className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Task Master
              </h1>
              <p className="text-slate-400 text-sm mt-1">Manage your workflow seamlessly</p>
            </div>
          </div>

          <button
            onClick={fetchTasks}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition duration-300 shadow-sm"
            title="Refresh Tasks"
          >
            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </header>

        <main>
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 flex items-center gap-3">
              <div className="flex-1">{error}</div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 max-w-md">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold mb-4 text-slate-200">New Task</h2>
                <TaskForm onAdd={handleAddTask} />
              </div>
            </div>

            <div className="lg:col-span-8">
              {isLoading && tasks.length === 0 ? (
                <div className="flex justify-center py-20">
                  <RefreshCcw className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
