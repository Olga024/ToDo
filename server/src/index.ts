import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks';
import { generateTasksFromPrompt } from './services/gigachat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.post('/api/generate-tasks', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Промпт обязателен' });
    }
    const tasks = await generateTasksFromPrompt(prompt);
    res.json({ tasks });
  } catch (error) {
    console.error('Ошибка GigaChat:', error);
    res.status(500).json({ error: 'Не удалось сгенерировать задачи' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});