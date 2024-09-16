const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const OPENAI_API_KEY = 'sk-...'; // Move API key to server

app.use(express.json());

app.post('/api/openai', async (req, res) => {
    const { userInput } = req.body;
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: userInput,
            max_tokens: 150,
        }),
    });
    const data = await response.json();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

