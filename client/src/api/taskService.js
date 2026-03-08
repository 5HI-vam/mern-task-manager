import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

// Get tasks
const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create new task
const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

// Update task status
const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`${API_URL}${taskId}`, taskData);
    return response.data;
};

// Delete task
const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_URL}${taskId}`);
    return response.data;
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskService;
