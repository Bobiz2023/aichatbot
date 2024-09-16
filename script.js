// Make sure you add your OpenAI API key here
const OPENAI_API_KEY = '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';

document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
    
    // Add the user input to the chat
    addMessageToChat(userInput, 'user');
    
    // Send the user's input to the OpenAI API
    fetchOpenAIResponse(userInput);
    
    // Clear input field
    document.getElementById('user-input').value = '';
});

function addMessageToChat(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchOpenAIResponse(userInput) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const botResponse = data.choices[0].text.trim();
        
        // Add bot's response to the chat
        addMessageToChat(botResponse, 'bot');
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        addMessageToChat('Sorry, something went wrong. Please try again.', 'bot');
    }
}

