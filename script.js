async function fetchOpenAIResponse(userInput) {
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        });

        const data = await response.json();
        const botResponse = data.choices[0].text.trim();
        addMessageToChat(botResponse, 'bot');
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        addMessageToChat('Sorry, something went wrong. Please try again.', 'bot');
    }
}
