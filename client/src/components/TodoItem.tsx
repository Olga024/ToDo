import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from '../types';

interface TodoItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoItem = ({ task, onToggle, onDelete }: TodoItemProps) => {
    return (
        <ListItem
            sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 2,
                boxShadow: 1,
                transition: '0.2s',
                '&:hover': { boxShadow: 3 },
            }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Checkbox
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                color="primary"
            />
            <Typography
                variant="body1"
                sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary',
                }}
            >
                {task.text}
            </Typography>
        </ListItem>
    );
};