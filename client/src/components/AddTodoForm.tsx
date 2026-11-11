import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoFormProps {
    onAdd: (text: string) => void;
}

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Что нужно сделать?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                size="small"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                disabled={!text.trim()}
            >
                Добавить
            </Button>
        </Box>
    );
};