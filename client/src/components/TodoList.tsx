import { List, Typography, Box } from '@mui/material';
import { TodoItem } from './TodoItem';
import type { Task } from '../types';

interface TodoListProps {
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoList = ({ tasks, onToggle, onDelete }: TodoListProps) => {
    if (tasks.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Пока нет задач. Добавьте первую!
                </Typography>
            </Box>
        );
    }

    return (
        <List sx={{ width: '100%' }}>
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </List>
    );
};