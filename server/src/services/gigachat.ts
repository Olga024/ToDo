import GigaChat from 'gigachat';
import { Agent } from 'node:https';
import dotenv from 'dotenv';

dotenv.config();

const httpsAgent = new Agent({
    rejectUnauthorized: false,
});

const client = new GigaChat({
    credentials: process.env.GIGACHAT_CREDENTIALS!,
    scope: process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS',
    model: process.env.GIGACHAT_MODEL || 'GigaChat-2-Max',
    httpsAgent: httpsAgent,
});

export async function generateTasksFromPrompt(prompt: string): Promise<string[]> {
    const response = await client.chat({
        messages: [
            {
                role: 'system',
                content: 'Ты — ассистент, который помогает разбивать большие задачи на маленькие подзадачи. Отвечай только списком подзадач, каждую с новой строки, без нумерации.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    });

    const content = response.choices[0]?.message.content || '';
    return content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}
