import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import type { Task } from './types';
import { AIGenerator } from './components/AIGenerator';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (text: string) => {
    try {
      const newTask = await createTask(text);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Не удалось добавить задачу');
    }
  };

  const handleToggle = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const updated = await updateTask(id, !task.completed);
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('Не удалось обновить задачу');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError('Не удалось удалить задачу');
    }
  };

  const handleAIGenerate = async (taskTexts: string[]) => {
    try {
      const newTasks: Task[] = [];
      for (const text of taskTexts) {
        const newTask = await createTask(text);
        newTasks.push(newTask);
      }
      setTasks([...newTasks, ...tasks]);
    } catch (err) {
      setError('Не удалось добавить сгенерированные задачи');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700 }}>
        Список задач
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <AIGenerator onGenerate={handleAIGenerate} />

        <AddTodoForm onAdd={handleAdd} />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TodoList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </Paper>
    </Container>
  );
}

export default App;