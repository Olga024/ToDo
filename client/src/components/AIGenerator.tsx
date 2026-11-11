import { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { generateTasks } from '../api/tasks';

interface AIGeneratorProps {
    onGenerate: (tasks: string[]) => void;
}

export const AIGenerator = ({ onGenerate }: AIGeneratorProps) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsGenerating(true);
        try {
            const generatedTasks = await generateTasks(prompt.trim());
            onGenerate(generatedTasks);
            setPrompt('');
        } catch (error) {
            console.error('Ошибка генерации:', error);
            alert('Не удалось сгенерировать задачи. Проверьте подключение к GigaChat.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleGenerate} sx={{ mb: 4, p: 2, bgcolor: '#f3f6f4', borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                ✨ Умный помощник
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Например: Подготовка к презентации..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    disabled={!prompt.trim() || isGenerating}
                    startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                >
                    {isGenerating ? 'Генерирую...' : 'Разбить на задачи'}
                </Button>
            </Box>
        </Box>
    );
};