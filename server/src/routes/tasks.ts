import express, { Request, Response } from 'express';
import db from '../db';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC').all();
    res.json(tasks);
});

router.post('/', (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Текст задачи обязателен' });
    }

    const result = db.prepare('INSERT INTO tasks (text) VALUES (?)').run(text);
    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTask);
});

router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Поле completed должно быть boolean' });
    }

    const result = db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(completed ? 1 : 0, id);
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    res.json(updatedTask);
});

router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }

    res.status(204).send();
});

export default router;