import axios from 'axios';
import type { Task } from '../types';


const api = axios.create({
    baseURL: '/api',
});

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
};

export const createTask = async (text: string): Promise<Task> => {
    const response = await api.post('/tasks', { text });
    return response.data;
};

export const updateTask = async (id: number, completed: boolean): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, { completed });
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const generateTasks = async (prompt: string): Promise<string[]> => {
    const response = await api.post('/generate-tasks', { prompt });
    return response.data.tasks;
};